export const getWithGestureOffset = (
  prevOffset: number,
  translationY: number
): number => {
  const nextAbsoluteOffset = prevOffset + translationY
  if (nextAbsoluteOffset <= 0) return 0
  return 999
}
