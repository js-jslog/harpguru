import { ZoomIds } from '../../types'

import { determineBestBoundsForHarpLength } from './determine-best-bounds-for-harp-length'

export const determineNextColumnBounds = (
  harpLength: number,
  currentColumnBounds: 'FIT' | readonly [number, number],
  zoomId: ZoomIds
): 'FIT' | readonly [number, number] => {
  return (() => {
    if (zoomId === ZoomIds.Fit) return 'FIT'
    if (currentColumnBounds === 'FIT') {
      return [0, zoomId - 1] as const
    }
    const [currentStart] = currentColumnBounds
    return determineBestBoundsForHarpLength(harpLength, [
      currentStart,
      currentStart + zoomId - 1,
    ])
  })()
}
