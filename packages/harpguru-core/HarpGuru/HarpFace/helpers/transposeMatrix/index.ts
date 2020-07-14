type Row<T> = ReadonlyArray<T>
type Matrix<T> = ReadonlyArray<Row<T>>

export const transposeMatrix = <T>(matrix: Matrix<T>): Matrix<T> => {
  if (matrix.length === 1 && matrix[0].length === 0) return [[]]

  if (!matrix.every((row) => row.length === matrix[0].length)) {
    const errorMessage = `
      All rows in the matrix must be the same length.
      Pad with \`undefined\` if required.

      Input matrix: ${JSON.stringify(matrix)}
    `
    throw new Error(errorMessage)
  }

  return matrix[0].map((_, index) => matrix.map((element) => element[index]))
}
