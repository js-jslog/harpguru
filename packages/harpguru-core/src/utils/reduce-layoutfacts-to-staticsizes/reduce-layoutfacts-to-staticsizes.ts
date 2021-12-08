import type { SizeScheme } from '../../types'
import { getWindowDimensions } from '../../packages/get-window-dimensions'

const relativeSizes: Omit<
  SizeScheme,
  | 'columnWidth'
  | 'rowHeight'
  | 'legendWidth'
  | 'zoomSlideWidth'
  | 'fragmentGutter'
  | 'labelProtrusion'
  | 'labelIconSize'
> = {
  0: 0,
  1: 1,
  2: 1.618,
  3: 2.618,
  4: 4.236,
  5: 6.854,
  6: 11.09,
  7: 17.944,
  8: 29.034,
  9: 46.979,
  10: 76.013,
  11: 122.989,
} as const

export const reduceLayoutFactsToStaticSizes = (
  prevSizes: SizeScheme | undefined
): SizeScheme => {
  const { longEdge } = getWindowDimensions()
  const staticSeedSize = longEdge / 750

  const staticSizes: SizeScheme = {
    0: staticSeedSize * relativeSizes[0],
    1: staticSeedSize * relativeSizes[1],
    2: staticSeedSize * relativeSizes[2],
    3: staticSeedSize * relativeSizes[3],
    4: staticSeedSize * relativeSizes[4],
    5: staticSeedSize * relativeSizes[5],
    6: staticSeedSize * relativeSizes[6],
    7: staticSeedSize * relativeSizes[7],
    8: staticSeedSize * relativeSizes[8],
    9: staticSeedSize * relativeSizes[9],
    10: staticSeedSize * relativeSizes[10],
    11: staticSeedSize * relativeSizes[11],
    columnWidth: 0,
    rowHeight: 0,
    legendWidth: 0,
    zoomSlideWidth: 0,
    fragmentGutter: 0,
    labelProtrusion: 0,
    labelIconSize: 0,
  } as const

  if (prevSizes && isMatch(prevSizes, staticSizes)) return prevSizes
  return staticSizes
}

const isMatch = (prevSizes: SizeScheme, nextSizes: SizeScheme): boolean => {
  if (prevSizes[0] !== nextSizes[0]) return false
  if (prevSizes[1] !== nextSizes[1]) return false
  if (prevSizes[2] !== nextSizes[2]) return false
  if (prevSizes[3] !== nextSizes[3]) return false
  if (prevSizes[4] !== nextSizes[4]) return false
  if (prevSizes[5] !== nextSizes[5]) return false
  if (prevSizes[6] !== nextSizes[6]) return false
  if (prevSizes[7] !== nextSizes[7]) return false
  if (prevSizes[8] !== nextSizes[8]) return false
  if (prevSizes[9] !== nextSizes[9]) return false
  if (prevSizes[10] !== nextSizes[10]) return false
  if (prevSizes[11] !== nextSizes[11]) return false
  if (prevSizes.columnWidth !== nextSizes.columnWidth) return false
  if (prevSizes.rowHeight !== nextSizes.rowHeight) return false
  if (prevSizes.legendWidth !== nextSizes.legendWidth) return false
  if (prevSizes.zoomSlideWidth !== nextSizes.zoomSlideWidth) return false
  if (prevSizes.fragmentGutter !== nextSizes.fragmentGutter) return false
  if (prevSizes.labelProtrusion !== nextSizes.labelProtrusion) return false
  if (prevSizes.labelIconSize !== nextSizes.labelIconSize) return false
  return true
}
