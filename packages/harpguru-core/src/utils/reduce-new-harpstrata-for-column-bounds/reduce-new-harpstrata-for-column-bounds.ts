import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { determineZoomId } from '../determine-zoom-id'
import { determineNextColumnBounds } from '../determine-next-column-bounds'
import { determineMatrixDimensions } from '../determine-matrix-dimensions'
import { compareColumnBounds } from '../compare-column-bounds'
import type { GlobalState } from '../../types'

export const reduceNewHarpStrataForColumnBounds = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'columnBounds'> => {
  const { columnBounds } = global
  const { degreeMatrix: newDegreeMatrix } = newHarpStrata
  const { columns: columnCount } = determineMatrixDimensions(newDegreeMatrix)
  // TODO: This defaulting should perhaps be done in the
  // `determineNextColumnBounds` function since it's going
  // to be useful in multiple locations.
  const zoomId = determineZoomId(columnBounds)
  const newColumnBounds = determineNextColumnBounds(
    columnCount,
    columnBounds,
    zoomId
  )

  if (compareColumnBounds(columnBounds, newColumnBounds))
    return { columnBounds }
  return { columnBounds: newColumnBounds }
}
