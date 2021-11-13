type MatrixDimensions = {
  readonly columns: number
  readonly rows: number
}

export const determineMatrixDimensions = (
  matrix: ReadonlyArray<ReadonlyArray<unknown>>
): MatrixDimensions => {
  const { length: rows } = matrix
  const columns = (() => {
    if (!matrix[0]) return 0
    return matrix[0].length
  })()

  return { columns, rows }
}
