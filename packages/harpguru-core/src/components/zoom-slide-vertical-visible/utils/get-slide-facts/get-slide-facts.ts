import { getWindowDimensions } from '../../../../packages/get-window-dimensions'

type SlideFacts = {
  readonly trackLength: number
  readonly slideHeadOffset: number
  readonly slideLength: number
  readonly slotCount: number
  readonly slideSpan: number
}
export const getSlideFacts = (
  columnBounds: readonly [number, number],
  columnCount: number
): SlideFacts => {
  const [startBound, endBound] = columnBounds
  const slotCount = columnCount - 1
  const { shortEdge: trackLength } = getWindowDimensions()
  const slotLength = trackLength / slotCount
  const slideHeadOffset = slotLength * startBound
  const slideSpan = endBound - startBound
  const slideLength = slotLength * slideSpan

  return {
    trackLength,
    slideHeadOffset,
    slideLength,
    slotCount,
    slideSpan,
  }
}
