export const getWithGestureOffset = (
  prevOffset: number,
  translationY: number,
  slideLength: number,
  trackLength: number
): number => {
  const nextAbsoluteOffset = prevOffset + translationY
  const maxSlideOffset = trackLength - slideLength
  if (nextAbsoluteOffset <= 0) return 0
  if (nextAbsoluteOffset >= maxSlideOffset) return maxSlideOffset
  return 999
}
