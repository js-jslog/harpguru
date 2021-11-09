import { getWindowDimensions } from '../../../../packages/get-window-dimensions'

type SlideFacts = {
  readonly slideHeadIndex: number
  readonly slideTailIndex: number
  readonly trackLength: number
  readonly slideHeadOffset: number
  readonly slideLength: number
  readonly slideSpan: number
  readonly slotCount: number
}
export const getSlideFacts = (
  columnBounds: readonly [number, number],
  columnCount: number
): SlideFacts => {
  const [slideHeadIndex, slideTailIndex] = columnBounds
  const slotCount = columnCount - 1
  const { shortEdge: trackLength } = getWindowDimensions()
  const slotLength = trackLength / slotCount
  const slideHeadOffset = slotLength * slideHeadIndex
  const [startBound, endBound] = columnBounds
  const slideSpan = endBound - startBound
  const slideLength = slotLength * slideSpan

  return {
    slideHeadIndex,
    slideTailIndex,
    trackLength,
    slideHeadOffset,
    slideLength,
    slideSpan,
    slotCount,
  }
}
