import type { HarpFaceMatrix, Degree } from 'harpparts'

import {
  determineMatrixDimensions,
  determineNextColumnBounds,
  compareColumnBounds,
} from '../../../../utils'
import { ZoomIds } from '../../../../types'

export const reduceForNewColumnBoundsByZoomId = (
  columnBounds: 'FIT' | readonly [number, number],
  activeDegreeMatrix: HarpFaceMatrix<Degree>,
  zoomId: ZoomIds
): 'FIT' | readonly [number, number] => {
  const { columns: columnCount } = determineMatrixDimensions(activeDegreeMatrix)
  const newColumnBounds = determineNextColumnBounds(
    columnCount,
    columnBounds,
    zoomId
  )

  if (compareColumnBounds(columnBounds, newColumnBounds)) return columnBounds
  return newColumnBounds
}
