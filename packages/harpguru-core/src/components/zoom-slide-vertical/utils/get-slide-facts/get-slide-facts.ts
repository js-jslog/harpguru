import { getWindowDimensions } from '../../../../packages/get-window-dimensions'

type SlideFacts = {
  readonly trackLength: number
  readonly slideOffsetLength: number
  readonly slideLength: number
  readonly maxTrackIndex: number
  readonly slideIndexSpan: number
}
export const getSlideFacts = (
  trackBounds: readonly [number, number],
  columnCount: number
): SlideFacts => {
  const [startBound, endBound] = trackBounds
  const maxTrackIndex = columnCount - 1
  const { shortEdge: trackLength } = getWindowDimensions()
  const slotLength = trackLength / maxTrackIndex
  const slideOffsetLength = slotLength * startBound
  const slideIndexSpan = endBound - startBound
  const slideLength = slotLength * slideIndexSpan

  return {
    trackLength,
    slideOffsetLength,
    slideLength,
    maxTrackIndex,
    slideIndexSpan,
  }
}
