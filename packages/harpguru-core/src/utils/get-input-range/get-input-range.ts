export const getInputRange = (rangeLength: number): ReadonlyArray<number> => {
  'worklet'
  if (rangeLength < 1)
    throw Error('Only range lengths greater than 0 are valid')

  // Input ranges have to have at least 2 elements so when there is only one
  // list in the stack we have to return an 'always on' range of 2 so that
  // the interpolation can always return 1. We *could* just not use interpolation
  // for OptionStacks with 1 layer, but this requires much less code and is
  // simple to understand.
  if (rangeLength === 1) return [1, 1]

  return [...Array(rangeLength).keys()]
}
