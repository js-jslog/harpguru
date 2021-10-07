import type { HarpFaceMatrix } from 'harpparts'

import { isPopulatedArray } from '../is-populated-array'
import type { ColumnBounds } from '../../../../types'
import { sliceMatrix } from '../../../../packages/slice-matrix'

export const reduceFullMatrixToViewableMatrix = <T>(
  activeMatrix: HarpFaceMatrix<T>,
  columnBounds: ColumnBounds
): HarpFaceMatrix<T> => {
  if (columnBounds === 'FIT') return activeMatrix

  const [start, end] = columnBounds

  const nextViewableMatrix = sliceMatrix(activeMatrix, start, end + 1).filter(
    isPopulatedArray
  )

  return nextViewableMatrix
}
