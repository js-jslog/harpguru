export const ascendingExclusiveRange = (
  start: number,
  end: number
): number[] => {
  return Array.from({ length: end - start }, (_, index) => index + 1).slice(
    0,
    -1
  )
}
