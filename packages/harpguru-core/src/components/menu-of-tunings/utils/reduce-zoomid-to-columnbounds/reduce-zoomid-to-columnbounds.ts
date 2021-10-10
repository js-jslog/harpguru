import type { HarpFaceMatrix, Degree } from 'harpparts'

import {
  determineMatrixDimensions,
  determineNextColumnBounds,
  isMatchColumnBounds,
} from '../../../../utils'
import type { ColumnBounds, ZoomIds } from '../../../../types'

export const reduceZoomIdToColumnBounds = (
  preColumnBounds: ColumnBounds,
  activeDegreeMatrix: HarpFaceMatrix<Degree>,
  zoomId: ZoomIds
): ColumnBounds => {
  const { columns: columnCount } = determineMatrixDimensions(activeDegreeMatrix)
  const newColumnBounds = determineNextColumnBounds(
    columnCount,
    preColumnBounds,
    zoomId
  )

  if (isMatchColumnBounds(preColumnBounds, newColumnBounds))
    return preColumnBounds
  return newColumnBounds
}
