import type { Dispatch } from 'reactn/default'

import { ZoomIds } from '../../types'
import type { GlobalState } from '../../types'

import { determineZoomId } from './determine-zoom-id'
import { determineNextColumnBounds } from './determine-next-column-bounds'

export const setNewColumnBoundsReducer = (
  global: GlobalState,
  _dipatch: Dispatch,
  zoomId: ZoomIds = determineZoomId(global.columnBounds)
): Pick<GlobalState, 'columnBounds'> => {
  const {
    columnBounds,
    activeHarpStrata: { degreeMatrix: activeDegreeMatrix },
  } = global
  const { [0]: exampleHarpRow } = activeDegreeMatrix
  const { length: activeColumnCount } = exampleHarpRow
  const newColumnBounds = determineNextColumnBounds(
    activeColumnCount,
    columnBounds,
    zoomId
  )

  // TODO: read the documentation - if it's the same value as existing then
  // I think I should be returning an empty object.
  return {
    columnBounds: newColumnBounds,
  }
}
