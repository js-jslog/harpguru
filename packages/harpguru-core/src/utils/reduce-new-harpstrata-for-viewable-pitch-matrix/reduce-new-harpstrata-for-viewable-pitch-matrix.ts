import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

// TODO: Sort out this import
import { determineNextColumnBounds } from '../reduce-for-new-column-bounds/determine-next-column-bounds'
import { isPopulatedArray } from '../is-populated-array'
import { determineZoomId } from '../determine-zoom-id'
import type { GlobalState } from '../../types'
import { sliceMatrix } from '../../packages/slice-matrix'
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
  // TODO: This should eventually use the same util which
  // the reduceForNewLayoutFacts reducer will eventually use
  const { [0]: exampleHarpRow } = newPitchMatrix
  const { length: activeColumnCount } = exampleHarpRow
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
    if (doSparceIdedObjectMatricesMatch(newPitchMatrix, viewablePitchMatrix)) {
      return { viewablePitchMatrix }
    }
    return {
      viewablePitchMatrix: newPitchMatrix,
    }
  }

  const [start, end] = newColumnBounds

  const newViewablePitchMatrix = sliceMatrix(
    newPitchMatrix,
    start,
    end + 1
  ).filter(isPopulatedArray)

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
