export const isPopulatedArray = (array: ReadonlyArray<unknown>): boolean => {
  return array.some((item) => item !== undefined)
}
