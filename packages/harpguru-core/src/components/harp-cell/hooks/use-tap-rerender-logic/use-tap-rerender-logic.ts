import {
  GestureHandlerStateChangeNativeEvent,
  State,
} from 'react-native-gesture-handler'
import React from 'react'
import { DegreeIds, IsActiveIds } from 'harpstrata'

import { useAddBufferedActivityToggle } from '../use-add-buffered-activity-toggle'
import { CellState } from '../../../../types'

type TapHandler = (arg0: GestureHandlerStateChangeNativeEvent) => void

export const useTapRerenderLogic = (
  thisDegreeId: DegreeIds | undefined,
  thisIsActiveId: IsActiveIds | undefined
): [CellState, TapHandler] => {
  const initialCellState =
    thisIsActiveId && thisIsActiveId === IsActiveIds.Active
      ? CellState.ON
      : CellState.OFF
  const [cellState, setCellState] = React.useState(initialCellState)
  const addBufferedActivityToggle = useAddBufferedActivityToggle()

  const tapHandler = (nativeEvent: GestureHandlerStateChangeNativeEvent) => {
    if (thisDegreeId === undefined) return
    const cancelToggleStates = [State.CANCELLED, State.FAILED]
    if (nativeEvent.state === State.BEGAN) {
      const relevantState =
        thisIsActiveId === IsActiveIds.Active
          ? CellState.TAPPED_OFF
          : CellState.TAPPED_ON
      setCellState(relevantState)
    } else if (cancelToggleStates.includes(nativeEvent.state)) {
      setCellState(CellState.OFF)
    } else if (nativeEvent.state === State.END) {
      addBufferedActivityToggle(thisDegreeId)
    }
  }

  React.useEffect(() => {
    if (thisIsActiveId === undefined) return
    const appropriateCellState =
      thisIsActiveId === IsActiveIds.Active ? CellState.ON : CellState.OFF
    if (cellState !== appropriateCellState) {
      setCellState(appropriateCellState)
    }
  }, [thisIsActiveId, setCellState])

  return [cellState, tapHandler]
}
