import { ZoomIds } from '../../types'
import type { ColumnBounds } from '../../types'

import { determineBestBoundsForHarpLength } from './determine-best-bounds-for-harp-length'

export const determineNextColumnBounds = (
  harpLength: number,
  currentColumnBounds: ColumnBounds,
  zoomId: ZoomIds
): ColumnBounds => {
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
