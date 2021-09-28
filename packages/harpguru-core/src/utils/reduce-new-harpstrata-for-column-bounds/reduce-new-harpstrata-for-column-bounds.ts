import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

// TODO: fix the location of this import
import { determineNextColumnBounds } from '../reduce-for-new-column-bounds/determine-next-column-bounds'
import { determineZoomId } from '../determine-zoom-id'
import { compareColumnBounds } from '../compare-column-bounds'
import type { GlobalState } from '../../types'

// TODO: Copied from reduce-for-new-column-bounds
// Make sure to add unit tests for the return value
// equality checks, and create a util for doing the new
// column bounds judgement
export const reduceNewHarpStrataForColumnBounds = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'columnBounds'> => {
  const { columnBounds } = global
  const { degreeMatrix: newDegreeMatrix } = newHarpStrata
  // TODO: This should eventually use the same util which
  // the reduceForNewLayoutFacts reducer will eventually use
  const { [0]: exampleHarpRow } = newDegreeMatrix
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

  if (compareColumnBounds(columnBounds, newColumnBounds))
    return { columnBounds }
  return { columnBounds: newColumnBounds }
}
