import type { HarpFaceMatrix, Degree } from 'harpparts'

import {
  determineMatrixDimensions,
  determineNextColumnBounds,
  isMatchColumnBounds,
} from '../../../../utils'
import type { ColumnBounds, ZoomIds } from '../../../../types'

export const reduceForNewColumnBoundsByZoomId = (
  columnBounds: ColumnBounds,
  activeDegreeMatrix: HarpFaceMatrix<Degree>,
  zoomId: ZoomIds
): ColumnBounds => {
  const { columns: columnCount } = determineMatrixDimensions(activeDegreeMatrix)
  const newColumnBounds = determineNextColumnBounds(
    columnCount,
    columnBounds,
    zoomId
  )

  if (isMatchColumnBounds(columnBounds, newColumnBounds)) return columnBounds
  return newColumnBounds
}
