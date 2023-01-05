import { useGlobal } from 'reactn'
import { runOnJS, useAnimatedGestureHandler } from 'react-native-reanimated'
import type {
  GestureEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler'
import React from 'react'
import { DegreeIds } from 'harpparts'

import { useAddBufferedActivityToggle } from '../use-add-buffered-activity-toggle'
import { CellStates } from '../../../../types'
import { tapAnimationDuration } from '../../../../constants'

type GestureHandler = (
  arg0: GestureEvent<TapGestureHandlerEventPayload>
) => void

export const useTapRerenderLogic = (
  thisDegreeId: DegreeIds | undefined,
  thisIsActive: boolean
): [CellStates, GestureHandler] => {
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')
  const isGloballyActive = thisIsActive
  const isLocallyActive =
    (thisDegreeId !== undefined &&
      !isGloballyActive &&
      bufferedActivityToggles.includes(thisDegreeId)) ||
    (thisDegreeId !== undefined &&
      isGloballyActive &&
      !bufferedActivityToggles.includes(thisDegreeId))

  const initialCellState = isGloballyActive ? CellStates.On : CellStates.Off
  const [cellState, setCellState] = React.useState(initialCellState)
  const addBufferedActivityToggle = useAddBufferedActivityToggle()

  const onStartSetCellStateWrapper = () => {
    setCellState(isGloballyActive ? CellStates.TappedOff : CellStates.TappedOn)
  }
  const onCancelSetCellStateWrapper = () => {
    setCellState(isLocallyActive ? CellStates.On : CellStates.Off)
  }
  const addBufferedActivityToggleWrapper = () => {
    if (thisDegreeId === undefined) return
    addBufferedActivityToggle(thisDegreeId)
  }
  const gestureHandler = useAnimatedGestureHandler<
    GestureEvent<TapGestureHandlerEventPayload>
  >(
    {
      onStart: () => {
        runOnJS(onStartSetCellStateWrapper)()
      },
      onCancel: () => {
        runOnJS(onCancelSetCellStateWrapper)()
      },
      onFail: () => {
        runOnJS(onCancelSetCellStateWrapper)()
      },
      onEnd: () => {
        runOnJS(addBufferedActivityToggleWrapper)()
      },
    },
    [
      onStartSetCellStateWrapper,
      onCancelSetCellStateWrapper,
      addBufferedActivityToggleWrapper,
    ]
  )

  // This ensures that once the harpstrata's activity has been updated from
  // the toggle buffer, a render is produced in all the cells by their state
  // being set accordingly. It is preferable to drive the cell renders from
  // this state rather than the harpstrata's activity directly since so much
  // of the cells render logic is already associated with it's CellState and
  // it will be easier to grasp the logic if it is centred on a single value.
  React.useEffect(() => {
    if (thisDegreeId === undefined) return
    const relevantState = isGloballyActive ? CellStates.On : CellStates.Off
    if (cellState !== relevantState) {
      setCellState(relevantState)
    }
  }, [isGloballyActive, setCellState])

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
    }, tapAnimationDuration)
    return () => {
      clearTimeout(postTapStateSet)
    }
  }, [cellState, setCellState])

  return [cellState, gestureHandler]
}
