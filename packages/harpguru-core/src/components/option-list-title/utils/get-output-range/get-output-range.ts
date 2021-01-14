export const getOutputRange = (
  index: number,
  rangeLength: number
): ReadonlyArray<number> => {
  const head = new Array(index).fill(0)
  const tail = new Array(rangeLength - index - 1).fill(0)
  return [...head, 1, ...tail]
}
