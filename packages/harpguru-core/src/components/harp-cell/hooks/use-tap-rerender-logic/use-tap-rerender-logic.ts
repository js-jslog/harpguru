import { useGlobal } from 'reactn'
import {
  GestureHandlerStateChangeNativeEvent,
  State,
} from 'react-native-gesture-handler'
import React from 'react'
import { DegreeIds, IsActiveIds } from 'harpstrata'

import { useAddBufferedActivityToggle } from '../use-add-buffered-activity-toggle'
import { CellStates } from '../../../../types'

type TapHandler = (arg0: GestureHandlerStateChangeNativeEvent) => void

export const useTapRerenderLogic = (
  thisDegreeId: DegreeIds | undefined,
  thisIsActiveId: IsActiveIds | undefined
): [CellStates, TapHandler] => {
  const initialCellState =
    thisIsActiveId && thisIsActiveId === IsActiveIds.Active
      ? CellStates.On
      : CellStates.Off
  const [cellState, setCellState] = React.useState(initialCellState)
  const addBufferedActivityToggle = useAddBufferedActivityToggle()
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')

  const isGloballyActive = thisIsActiveId === IsActiveIds.Active
  const isLocallyActive =
    (!isGloballyActive && bufferedActivityToggles.includes(thisDegreeId)) ||
    (isGloballyActive && !bufferedActivityToggles.includes(thisDegreeId))
  const tapHandler = (nativeEvent: GestureHandlerStateChangeNativeEvent) => {
    if (thisDegreeId === undefined) return
    const cancelToggleStates = [State.CANCELLED, State.FAILED]
    if (nativeEvent.state === State.BEGAN) {
      const relevantState =
        thisIsActiveId === IsActiveIds.Active
          ? CellStates.TappedOff
          : CellStates.TappedOn
      setCellState(relevantState)
    } else if (cancelToggleStates.includes(nativeEvent.state)) {
      const relevantState = isLocallyActive ? CellStates.On : CellStates.Off
      setCellState(relevantState)
    } else if (nativeEvent.state === State.END) {
      addBufferedActivityToggle(thisDegreeId)
    }
  }

  // This ensures that once the harpstrata's activity has been updated from
  // the toggle buffer, a render is produced in all the cells by their state
  // being set accordingly. It is preferable to drive the cell renders from
  // this state rather than the harpstrata's activity directly since so much
  // of the cells render logic is already associated with it's CellState and
  // it will be easier to grasp the logic if it is centred on a single value.
  React.useEffect(() => {
    if (thisIsActiveId === undefined) return
    const relevantState =
      thisIsActiveId === IsActiveIds.Active ? CellStates.On : CellStates.Off
    if (cellState !== relevantState) {
      setCellState(relevantState)
    }
  }, [thisIsActiveId, setCellState])

  // This sets the cellState to the untapped version after an interval sufficiently
  // long for the associated animation to have completed.
  // The reason this is required is because when the user taps the cell again
  // we still want the animation to convey the recognition of the action, even
  // if that action will not have a new effect until the harpface has updated
  // with all of the updated harpstrata activity.
  React.useEffect(() => {
    if (cellState !== CellStates.TappedOn && cellState !== CellStates.TappedOff)
      return
    const postTapStateSet = setTimeout(() => {
      const relevantState =
        cellState === CellStates.TappedOn ? CellStates.On : CellStates.Off
      setCellState(relevantState)
    }, 100)
    return () => {
      clearTimeout(postTapStateSet)
    }
  }, [cellState, setCellState])

  return [cellState, tapHandler]
}
