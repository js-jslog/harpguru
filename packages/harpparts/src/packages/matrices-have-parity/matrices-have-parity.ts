export const matricesHaveParity = (
  matrixA: ReadonlyArray<ReadonlyArray<unknown | undefined>>,
  matrixB: ReadonlyArray<ReadonlyArray<unknown | undefined>>
): [boolean, ReadonlyArray<string>] => {
  const mismatchMessages: string[] = []
  const matrix1dsMatch = matrixA.length === matrixB.length
  const matrix2dsMatch = matrixA[0].length === matrixB[0].length
  if (!matrix1dsMatch || !matrix2dsMatch)
    mismatchMessages.push(
      `Apparent mismatch in matrix widths or heights: [${matrixA.length}, ${matrixA[0].length}] vs [${matrixB.length}, ${matrixB[0].length}]`
    )

  matrixA.forEach((rowA, indexY: number) => {
    return rowA.forEach((elementA, indexX: number) => {
      const {
        [indexY]: { [indexX]: elementB },
      } = matrixB
      const noParityA = elementA === undefined && elementB !== undefined
      const noParityB = elementA !== undefined && elementB === undefined

      if (noParityA || noParityB)
        mismatchMessages.push(`Mismatch found at YX (${indexY},${indexX})`)

      return noParityA || noParityB
    })
  })

  return [mismatchMessages.length === 0, mismatchMessages]
}
