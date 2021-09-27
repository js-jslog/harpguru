import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

// TODO: Sort out this import
import { determineNextColumnBounds } from '../reduce-for-new-column-bounds/determine-next-column-bounds'
import { isPopulatedArray } from '../is-populated-array'
import { determineZoomId } from '../determine-zoom-id'
import type { GlobalState } from '../../types'
import { sliceMatrix } from '../../packages/slice-matrix'

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
  // TODO: This should eventually use the same util which
  // the reduceForNewLayoutFacts reducer will eventually use
  const { [0]: exampleHarpRow1 } = newDegreeMatrix
  const { length: activeColumnCount } = exampleHarpRow1
  // TODO: This defaulting should perhaps be done in the
  // `determineNextColumnBounds` function since it's going
  // to be useful in multiple locations.
  const zoomId = determineZoomId(columnBounds)
  const newColumnBounds = determineNextColumnBounds(
    activeColumnCount,
    columnBounds,
    zoomId
  )

  // TODO: We need a single function to getViewableMatrices
  // from the harpstrata and the next columnBounds which can
  // then set a simple variable here which can then be compared
  // to the previous value.
  if (newColumnBounds === 'FIT') {
    const { length: rowCount } = newDegreeMatrix
    const { [0]: exampleHarpRow2 } = newDegreeMatrix
    const { length: columnCount } = exampleHarpRow2

    if (rowCount === harpfaceRows && columnCount === harpfaceColumns)
      return {
        layoutFacts,
      }

    return {
      layoutFacts: {
        harpfaceColumns: columnCount,
        harpfaceRows: rowCount,
      },
    }
  }

  const [start, end] = newColumnBounds

  const newViewableDegreeMatrix = sliceMatrix(
    newDegreeMatrix,
    start,
    end + 1
  ).filter(isPopulatedArray)

  const { length: rowCount } = newViewableDegreeMatrix
  const { [0]: exampleHarpRow2 } = newViewableDegreeMatrix
  const { length: columnCount } = exampleHarpRow2

  if (rowCount === harpfaceRows && columnCount === harpfaceColumns)
    return {
      layoutFacts,
    }

  return {
    layoutFacts: {
      harpfaceColumns: columnCount,
      harpfaceRows: rowCount,
    },
  }
}
