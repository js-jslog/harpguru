import {
  GestureHandlerStateChangeNativeEvent,
  State,
} from 'react-native-gesture-handler'
import React from 'react'
import { DegreeIds, IsActiveIds } from 'harpstrata'

import { useAddBufferedActivityToggle } from '../use-add-buffered-activity-toggle'

type TouchState = State
type TapHandler = (arg0: GestureHandlerStateChangeNativeEvent) => void

export const useTapRerenderLogic = (
  thisDegreeId: DegreeIds | undefined,
  thisIsActiveId: IsActiveIds | undefined
): [TouchState, TapHandler] => {
  const [touchState, setTouchState] = React.useState(State.UNDETERMINED)
  const addBufferedActivityToggle = useAddBufferedActivityToggle()

  const tapHandler = (nativeEvent: GestureHandlerStateChangeNativeEvent) => {
    if (thisDegreeId === undefined) return
    const tapDrivenRerenderableStates = [
      State.BEGAN,
      State.CANCELLED,
      State.FAILED,
    ]
    if (tapDrivenRerenderableStates.includes(nativeEvent.state)) {
      setTouchState(nativeEvent.state)
    }
    if (nativeEvent.state === State.END) {
      addBufferedActivityToggle(thisDegreeId)
    }
  }

  React.useEffect(() => {
    if (thisIsActiveId === undefined) return
    const { UNDETERMINED: isActiveDrivenRerenderableState } = State
    if (touchState !== isActiveDrivenRerenderableState) {
      setTouchState(isActiveDrivenRerenderableState)
    }
  }, [thisIsActiveId, setTouchState])

  return [touchState, tapHandler]
}
