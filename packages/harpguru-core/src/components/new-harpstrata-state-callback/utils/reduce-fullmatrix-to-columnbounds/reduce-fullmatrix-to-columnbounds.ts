import type { HarpFaceMatrix } from 'harpparts'

// TODO: Some of the functions should probably be moved if this plan comes off
// (plan to have "callback" esque updates to the other derived global state
import {
  determineNextColumnBounds,
  determineMatrixDimensions,
  determineZoomId,
} from '../../../../utils'
import type { ColumnBounds } from '../../../../types'

export const reduceFullMatrixToColumnBounds = (
  nextFullMatrix: HarpFaceMatrix<unknown>,
  prevColumnBounds: ColumnBounds
): ColumnBounds => {
  const { columns: columnCount } = determineMatrixDimensions(nextFullMatrix)
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
