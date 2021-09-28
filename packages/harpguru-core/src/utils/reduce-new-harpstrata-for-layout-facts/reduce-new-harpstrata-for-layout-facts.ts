import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

// TODO: Sort out this import
import { determineNextColumnBounds } from '../reduce-for-new-column-bounds/determine-next-column-bounds'
import { getViewableMatrix } from '../get-viewable-matrix'
import { determineZoomId } from '../determine-zoom-id'
import { determineMatrixDimensions } from '../determine-matrix-dimensions'
import type { GlobalState } from '../../types'

// TODO: Copied from `reduceNewHarpStrataForViewableDegreeMatrix``
// Make sure to add unit tests for the return value
// equality checks, and create a util for all the logic
// preseding that.
// Make sure to create shared functions for shared functionality.
export const reduceNewHarpStrataForLayoutFacts = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'layoutFacts'> => {
  const { layoutFacts } = global
  const { harpfaceColumns, harpfaceRows } = layoutFacts
  // TODO: All of this has been seen before in the
  // `reduceNewHarpStrataForColumnBounds` reducer so we
  // need to make this logic shared and then mocked during
  // the test of this reducer.
  const { columnBounds } = global
  const { degreeMatrix: newDegreeMatrix } = newHarpStrata
  const { columns: columnCount1 } = determineMatrixDimensions(newDegreeMatrix)
  // TODO: This defaulting should perhaps be done in the
  // `determineNextColumnBounds` function since it's going
  // to be useful in multiple locations.
  const zoomId = determineZoomId(columnBounds)
  const newColumnBounds = determineNextColumnBounds(
    columnCount1,
    columnBounds,
    zoomId
  )

  const viewableDegreeMatrix = getViewableMatrix(
    newDegreeMatrix,
    newColumnBounds
  )
  const { length: rowCount } = viewableDegreeMatrix
  const { columns: columnCount2 } = determineMatrixDimensions(
    viewableDegreeMatrix
  )

  if (rowCount === harpfaceRows && columnCount2 === harpfaceColumns)
    return {
      layoutFacts,
    }

  return {
    layoutFacts: {
      harpfaceColumns: columnCount2,
      harpfaceRows: rowCount,
    },
  }
}
