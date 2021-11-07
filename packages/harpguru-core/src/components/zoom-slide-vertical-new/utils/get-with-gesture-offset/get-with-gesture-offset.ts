export const getWithGestureOffset = (
  prevOffset: number,
  translationY: number,
  slideLength: number,
  trackLength: number
): number => {
  const nextOffset = prevOffset + translationY
  const maxOffset = trackLength - slideLength
  if (nextOffset <= 0) return 0
  if (nextOffset >= maxOffset) return maxOffset
  return nextOffset
}
