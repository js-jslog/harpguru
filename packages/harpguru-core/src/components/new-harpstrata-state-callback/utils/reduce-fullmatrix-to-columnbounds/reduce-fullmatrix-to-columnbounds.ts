import type { HarpFaceMatrix } from 'harpparts'

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
  const zoomId = determineZoomId(prevColumnBounds)
  const newColumnBounds = determineNextColumnBounds(
    columnCount,
    prevColumnBounds,
    zoomId
  )
  return newColumnBounds
}
