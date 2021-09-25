import { doRowsMatch } from './do-rows-match'

import type { SparceIdedObjectMatrix } from './types'

export const doSparceIdedObjectMatricesMatch = (
  matrix1: SparceIdedObjectMatrix,
  matrix2: SparceIdedObjectMatrix
): boolean => {
  const matrix1Matched = matrix1.every((row, index) =>
    doRowsMatch(row, matrix2[index])
  )
  const matrix2Matched = matrix2.every((row, index) =>
    doRowsMatch(row, matrix1[index])
  )
  return matrix1Matched && matrix2Matched
}
