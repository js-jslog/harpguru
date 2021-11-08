export const getFromIndexOffset = (
  slotIndex: number,
  trackLength: number,
  slotCount: number
): number => {
  const slotLength = trackLength / slotCount
  return slotLength * slotIndex
}
