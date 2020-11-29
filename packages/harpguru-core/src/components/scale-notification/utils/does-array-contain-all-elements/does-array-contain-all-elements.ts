export const doesArrayContainAllElements = <T>(
  array1: ReadonlyArray<T>,
  array2: ReadonlyArray<T>
): boolean => {
  if (array2.length === 0) return true
  return !!array2.reduce((acc: boolean | undefined, curr: T) => {
    if (acc === false) return false
    return array1.includes(curr)
  }, undefined)
}
