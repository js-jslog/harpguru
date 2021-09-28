import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { getViewableMatrix } from '../get-viewable-matrix'
import { determineZoomId } from '../determine-zoom-id'
import { determineNextColumnBounds } from '../determine-next-column-bounds'
import { determineMatrixDimensions } from '../determine-matrix-dimensions'
import type { GlobalState } from '../../types'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'

// TODO: Copied from `reduceForViewablePitchMatrix`
// Make sure to add unit tests for the return value
// equality checks, and create a util for all the logic
// preseding that.
export const reduceNewHarpStrataForViewablePitchMatrix = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'viewablePitchMatrix'> => {
  const { viewablePitchMatrix } = global
  // TODO: All of this has been seen before in the
  // `reduceNewHarpStrataForColumnBounds` reducer so we
  // need to make this logic shared and then mocked during
  // the test of this reducer.
  const { columnBounds } = global
  const { pitchMatrix: newPitchMatrix } = newHarpStrata
  const { columns: columnCount } = determineMatrixDimensions(newPitchMatrix)
  // TODO: This defaulting should perhaps be done in the
  // `determineNextColumnBounds` function since it's going
  // to be useful in multiple locations.
  const zoomId = determineZoomId(columnBounds)
  const newColumnBounds = determineNextColumnBounds(
    columnCount,
    columnBounds,
    zoomId
  )

  const newViewablePitchMatrix = getViewableMatrix(
    newPitchMatrix,
    newColumnBounds
  )
  if (
    doSparceIdedObjectMatricesMatch(newViewablePitchMatrix, viewablePitchMatrix)
  ) {
    return {
      viewablePitchMatrix,
    }
  }
  return {
    viewablePitchMatrix: newViewablePitchMatrix,
  }
}
