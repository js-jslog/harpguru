export enum Direction {
  Ascending,
  Descending,
}

export const isConsecutiveWithPrevious = (
  direction: Direction,
  element: number,
  index: number,
  array: number[]
): boolean => {
  if (index === 0) return true
  const { [index - 1]: prev } = array
  const shift = direction === Direction.Ascending ? 1 : -1
  return element === prev + shift
}
