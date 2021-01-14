export const getInputRange = (rangeLength: number): ReadonlyArray<number> => {
  if (rangeLength < 1)
    throw Error('Only range lengths greater than 0 are valid')

  return [...Array(rangeLength).keys()]
}
