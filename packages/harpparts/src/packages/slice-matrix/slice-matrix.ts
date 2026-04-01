type Row<T> = ReadonlyArray<T>
type Matrix<T> = ReadonlyArray<Row<T>>

export const sliceMatrix = <T>(
  matrix: Matrix<T>,
  start?: number,
  end?: number
): Matrix<T> => {
  return matrix.map((row: Row<T>) => row.slice(start, end))
}
