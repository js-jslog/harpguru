import Dispatcher from 'reactn/types/dispatcher'

import { ZoomIds } from '../../hooks/use-zoom-items/use-zoom-items'
import { GlobalState } from '../../../../types'

export const getNewColumnBoundsForDispatcher = (
  global: GlobalState,
  _dipatch: Dispatcher,
  zoomId: ZoomIds
): Pick<GlobalState, 'columnBounds'> => {
  const {
    columnBounds,
    activeHarpStrata: { degreeMatrix: activeDegreeMatrix },
  } = global
  const { [0]: exampleHarpRow } = activeDegreeMatrix
  const { length: activeColumnCount } = exampleHarpRow
  const newColumnBounds = (() => {
    if (zoomId === ZoomIds.Fit) return 'FIT'
    if (columnBounds === 'FIT') {
      if (zoomId === ZoomIds.Seven) return [0, 6] as const
      throw Error('TODO: IMPROVE THIS MESSAGE: Unexpected zoomId selected')
    }
    const [startColumn, endColumn] = columnBounds
    if (zoomId === ZoomIds.Seven) {
      if (activeColumnCount === 7) return columnBounds
      if (activeColumnCount >= startColumn + 7)
        return [startColumn, startColumn + 6] as const
      if (activeColumnCount < 7) return [0, 6] as const
      if (activeColumnCount < startColumn + 7) {
        const difference = startColumn + 7 - activeColumnCount
        return [startColumn - difference, endColumn - difference] as const
      }
    }
    throw Error('TODO: IMPROVE THIS MESSAGE: Unexpected scenario has occurred')
  })()

  return {
    columnBounds: newColumnBounds,
  }
}
