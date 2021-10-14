import type { HarpFaceMatrix } from 'harpparts'

import {
  determineNextColumnBounds,
  determineMatrixDimensions,
  determineZoomId,
  isMatchColumnBounds,
} from '../../../../utils'
import type { ColumnBounds } from '../../../../types'

export const reduceFullMatrixToColumnBounds = (
  prevColumnBounds: ColumnBounds,
  fullMatrix: HarpFaceMatrix<unknown>
): ColumnBounds => {
  const { columns: columnCount } = determineMatrixDimensions(fullMatrix)
  const zoomId = determineZoomId(prevColumnBounds)
  const nextColumnBounds = determineNextColumnBounds(
    columnCount,
    prevColumnBounds,
    zoomId
  )
  if (isMatchColumnBounds(prevColumnBounds, nextColumnBounds))
    return prevColumnBounds
  return nextColumnBounds
}
