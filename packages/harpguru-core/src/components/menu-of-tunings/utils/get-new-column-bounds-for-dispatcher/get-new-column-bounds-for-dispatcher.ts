import Dispatcher from 'reactn/types/dispatcher'

import { ZoomIds } from '../../types'
import { determineBest7Holes } from '../../../../utils'
import type { GlobalState } from '../../../../types'

import { determineZoomId } from './determine-zoom-id'

export const getNewColumnBoundsForDispatcher = (
  global: GlobalState,
  _dipatch: Dispatcher,
  zoomId: ZoomIds = determineZoomId(global.columnBounds)
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
    if (zoomId === ZoomIds.Seven) {
      return determineBest7Holes(activeColumnCount, columnBounds)
    }
    throw Error('TODO: IMPROVE THIS MESSAGE: Unexpected scenario has occurred')
  })()

  // TODO: read the documentation - if it's the same value as existing then
  // I think I should be returning an empty object.
  return {
    columnBounds: newColumnBounds,
  }
}
