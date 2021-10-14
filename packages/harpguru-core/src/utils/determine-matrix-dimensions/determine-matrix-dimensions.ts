type MatrixDimensions = {
  readonly columns: number
  readonly rows: number
}

export const determineMatrixDimensions = (
  matrix: ReadonlyArray<ReadonlyArray<unknown>>
): MatrixDimensions => {
  const { length: rows } = matrix
  const {
    [0]: { length: columns },
  } = matrix

  return { columns, rows }
}
