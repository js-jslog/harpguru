export const ascendingExclusiveRange = (
  start: number,
  end: number
): number[] => {
  const [lower, higher] = start < end ? [start, end] : [end, start]
  return Array.from({ length: higher - lower }, (_, index) => index + 1)
    .slice(0, -1)
    .map((val) => val + lower)
}
