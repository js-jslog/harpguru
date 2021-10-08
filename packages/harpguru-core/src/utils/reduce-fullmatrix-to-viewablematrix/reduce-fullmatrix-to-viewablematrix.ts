import type { HarpFaceMatrix } from 'harpparts'

import { isPopulatedArray } from '../is-populated-array'
import type { ColumnBounds } from '../../types'
import { sliceMatrix } from '../../packages/slice-matrix'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'
import type { IdedObject } from '../../packages/do-sparce-ided-object-matrices-match'

export const reduceFullMatrixToViewableMatrix = <T extends IdedObject>(
  prevViewableMatrix: HarpFaceMatrix<T>,
  fullMatrix: HarpFaceMatrix<T>,
  columnBounds: ColumnBounds
): HarpFaceMatrix<T> => {
  if (columnBounds === 'FIT') return fullMatrix

  const [start, end] = columnBounds

  const nextViewableMatrix = sliceMatrix(fullMatrix, start, end + 1).filter(
    isPopulatedArray
  )

  if (doSparceIdedObjectMatricesMatch(prevViewableMatrix, nextViewableMatrix))
    return prevViewableMatrix

  return nextViewableMatrix
}
