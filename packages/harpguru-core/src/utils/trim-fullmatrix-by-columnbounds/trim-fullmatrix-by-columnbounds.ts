import type { HarpFaceMatrix } from 'harpparts'

import type { ColumnBounds } from '../../types'
import { sliceMatrix } from '../../packages/slice-matrix'

export const trimFullMatrixByColumnBounds = <T>(
  matrix: HarpFaceMatrix<T>,
  columnBounds: ColumnBounds
): HarpFaceMatrix<T> => {
  if (columnBounds === 'FIT') return matrix

  const [start, end] = columnBounds

  return sliceMatrix(matrix, start, end + 1)
}
