import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

// TODO: Sort out this import
import { determineNextColumnBounds } from '../reduce-for-new-column-bounds/determine-next-column-bounds'
import { getViewableMatrix } from '../get-viewable-matrix'
import { determineZoomId } from '../determine-zoom-id'
import { determineMatrixDimensions } from '../determine-matrix-dimensions'
import type { GlobalState } from '../../types'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'

// TODO: Copied from `reduceForViewableDegreeMatrix`
// Make sure to add unit tests for the return value
// equality checks, and create a util for all the logic
// preseding that.
export const reduceNewHarpStrataForViewableDegreeMatrix = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'viewableDegreeMatrix'> => {
  const { viewableDegreeMatrix } = global
  // TODO: All of this has been seen before in the
  // `reduceNewHarpStrataForColumnBounds` reducer so we
  // need to make this logic shared and then mocked during
  // the test of this reducer.
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

  const newViewableDegreeMatrix = getViewableMatrix(
    newDegreeMatrix,
    newColumnBounds
  )
  if (
    doSparceIdedObjectMatricesMatch(
      newViewableDegreeMatrix,
      viewableDegreeMatrix
    )
  ) {
    return {
      viewableDegreeMatrix,
    }
  }
  return {
    viewableDegreeMatrix: newViewableDegreeMatrix,
  }
}
