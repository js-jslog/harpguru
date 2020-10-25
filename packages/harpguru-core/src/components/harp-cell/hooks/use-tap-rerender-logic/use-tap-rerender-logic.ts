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
      setCellState(CellStates.Off)
    } else if (nativeEvent.state === State.END) {
      addBufferedActivityToggle(thisDegreeId)
    }
  }

  React.useEffect(() => {
    if (thisIsActiveId === undefined) return
    const appropriateCellState =
      thisIsActiveId === IsActiveIds.Active ? CellStates.On : CellStates.Off
    if (cellState !== appropriateCellState) {
      setCellState(appropriateCellState)
    }
  }, [thisIsActiveId, setCellState])

  return [cellState, tapHandler]
}
