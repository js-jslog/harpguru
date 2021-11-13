import type { HarpFaceMatrix } from 'harpparts'

import { isMatchHighOrderTuples } from '../ismatch-highordertuples'
import { isPopulatedArray } from '../is-populated-array'
import type { ColumnBounds } from '../../types'
import { sliceMatrix } from '../../packages/slice-matrix'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'
import type { IdedObject } from '../../packages/do-sparce-ided-object-matrices-match'

export const reduceFullMatrixToViewableMatrix = <T extends IdedObject>(
  prevViewableMatrix: readonly [HarpFaceMatrix<T>, HarpFaceMatrix<T>],
  fullMatrix: readonly [HarpFaceMatrix<T>, HarpFaceMatrix<T>],
  columnBounds: ColumnBounds
): readonly [HarpFaceMatrix<T>, HarpFaceMatrix<T>] => {
  if (columnBounds === 'FIT') {
    if (
      isMatchHighOrderTuples(
        doSparceIdedObjectMatricesMatch,
        prevViewableMatrix,
        fullMatrix
      )
    )
      return prevViewableMatrix
    return fullMatrix
  }

  const [start, end] = columnBounds

  const nextViewableMatrix = [
    sliceMatrix(fullMatrix[0], start, end + 1).filter(isPopulatedArray),
    sliceMatrix(fullMatrix[1], start, end + 1).filter(isPopulatedArray),
  ] as const

  if (
    isMatchHighOrderTuples(
      doSparceIdedObjectMatricesMatch,
      prevViewableMatrix,
      nextViewableMatrix
    )
  )
    return prevViewableMatrix

  return nextViewableMatrix
}
