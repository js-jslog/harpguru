import type { HarpFaceMatrix } from 'harpparts'

import {
  determineNextColumnBounds,
  determineMatrixDimensions,
  determineZoomId,
} from '../../../../utils'
import type { ColumnBounds } from '../../../../types'

export const reduceFullMatrixToColumnBounds = (
  fullMatrix: HarpFaceMatrix<unknown>,
  prevColumnBounds: ColumnBounds
): ColumnBounds => {
  const { columns: columnCount } = determineMatrixDimensions(fullMatrix)
  const zoomId = determineZoomId(prevColumnBounds)
  const nextColumnBounds = determineNextColumnBounds(
    columnCount,
    prevColumnBounds,
    zoomId
  )
  return nextColumnBounds
}
