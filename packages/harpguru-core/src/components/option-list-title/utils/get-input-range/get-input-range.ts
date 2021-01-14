export const getInputRange = (rangeLength: number): ReadonlyArray<number> => {
  return [...Array(rangeLength).keys()]
}
