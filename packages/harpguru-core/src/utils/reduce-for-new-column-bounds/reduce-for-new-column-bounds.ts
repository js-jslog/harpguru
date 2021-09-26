import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { determineZoomId } from '../determine-zoom-id'
import { ZoomIds } from '../../types'
import type { GlobalState } from '../../types'

import { determineNextColumnBounds } from './determine-next-column-bounds'

export const reduceForNewColumnBounds = (
  global: GlobalState,
  _dipatch: Dispatch,
  zoomId: ZoomIds = determineZoomId(global.columnBounds),
  newHarpStrata: HarpStrata = global.activeHarpStrata
): Pick<GlobalState, 'columnBounds'> => {
  const { columnBounds } = global
  const { degreeMatrix: newDegreeMatrix } = newHarpStrata
  // TODO: This should eventually use the same util which
  // the reduceForNewLayoutFacts reducer will eventually use
  const { [0]: exampleHarpRow } = newDegreeMatrix
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
