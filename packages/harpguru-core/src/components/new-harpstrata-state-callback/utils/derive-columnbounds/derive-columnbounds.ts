import type { HarpStrata } from 'harpstrata'

// TODO: Some of the functions should probably be moved if this plan comes off
// (plan to have "callback" esque updates to the other derived global state
import {
  determineNextColumnBounds,
  determineMatrixDimensions,
  determineZoomId,
} from '../../../../utils'

export const deriveColumnBounds = (
  // TODO: Should consider simplifying this so that
  // only the next degree matrix is passed in rather
  // than the entire harpstrata
  activeHarpStrata: HarpStrata,
  prevColumnBounds: 'FIT' | readonly [number, number]
): 'FIT' | readonly [number, number] => {
  const { degreeMatrix: newDegreeMatrix } = activeHarpStrata
  const { columns: columnCount } = determineMatrixDimensions(newDegreeMatrix)
  // TODO: This defaulting should perhaps be done in the
  // `determineNextColumnBounds` function since it's going
  // to be useful in multiple locations.
  const zoomId = determineZoomId(prevColumnBounds)
  const newColumnBounds = determineNextColumnBounds(
    columnCount,
    prevColumnBounds,
    zoomId
  )
  return newColumnBounds
}
