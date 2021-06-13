export const isConsecutiveWithPrevious = (
  element: number,
  index: number,
  array: number[]
): boolean => {
  if (index === 0) return true
  return element === array[index - 1] + 1 || element === array[index - 1] - 1
}
