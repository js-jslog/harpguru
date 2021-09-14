type Row<T> = ReadonlyArray<T>
type Matrix<T> = ReadonlyArray<Row<T>>

export const sliceMatrix = <T>(
  matrix: Matrix<T>,
  startIndex?: number,
  endIndex?: number
): Matrix<T> => {
  const emptyMatrix = [[], []]

  const start = startIndex !== undefined ? startIndex : 0
  const end = endIndex !== undefined ? endIndex : matrix.length - 1

  if (start >= end) return emptyMatrix

  return matrix
}
