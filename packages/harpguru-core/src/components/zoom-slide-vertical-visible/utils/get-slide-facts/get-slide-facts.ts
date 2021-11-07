import { getWindowDimensions } from '../../../../packages/get-window-dimensions'

type SlideFacts = {
  readonly trackLength: number
  readonly slideLength: number
  readonly slideSpan: number
  readonly slotCount: number
}
export const getSlideFacts = (
  restrictingColumnBounds: readonly [number, number],
  totalHoles: number
): SlideFacts => {
  const slotCount = totalHoles - 1
  const { shortEdge: trackLength } = getWindowDimensions()
  const slotLength = trackLength / slotCount
  const [startBound, endBound] = restrictingColumnBounds
  const slideSpan = endBound - startBound
  const slideLength = slotLength * slideSpan

  return {
    trackLength,
    slideLength,
    slideSpan,
    slotCount,
  }
}
