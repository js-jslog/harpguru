import { isChromaticHarpFace } from 'harpparts'
import type { HarpFaceFacts } from 'harpparts'

import type { LayoutFacts, SizeScheme } from '../../types'
import { getWindowDimensions } from '../../packages/get-window-dimensions'
import { useIsZoomedColumnBounds } from '../../hooks'

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
const relativeColumnWidth = 9
const relativeFragmentGutterWidth = 7
const relativeLabelProtrusion = 9
const relativeLabelIconSize = 7

export const reduceLayoutFactsToDynamicSizes = (
  prevSizes: SizeScheme | undefined,
  layoutFacts: HarpFaceFacts<LayoutFacts>
): SizeScheme => {
  const { shortEdge, longEdge } = getWindowDimensions()
  const { harpfaceRowCount, harpfaceColumnCount } = (() => {
    const {
      harpface1: {
        harpfaceColumns: harpfaceColumnCount,
        harpfaceRows: harpface1RowCount,
      },
    } = layoutFacts
    if (isChromaticHarpFace(layoutFacts)) {
      const {
        harpface2: { harpfaceRows: harpface2RowCount },
      } = layoutFacts
      const harpfaceRowCount = harpface1RowCount + harpface2RowCount
      return {
        harpfaceColumnCount,
        harpfaceRowCount,
      }
    }
    return { harpfaceColumnCount, harpfaceRowCount: harpface1RowCount }
  })()

  const {
    [relativeColumnWidth]: columnWidth,
    [relativeFragmentGutterWidth]: fragmentGutter,
    [relativeLabelProtrusion]: labelProtrusion,
    [relativeLabelIconSize]: labelIconSize,
  } = relativeSizes
  const rowHeight = columnWidth
  const legendWidth = columnWidth
  const zoomSlideWidth = useIsZoomedColumnBounds() === false ? 0 : columnWidth

  // We need the sizing scheme to be as independant from the updates of the
  // updates of the global properties as possible. If it isn't then we will
  // see size updates after insignificant interactions. Getting an accurate
  // measure of the number of octave groups is a waste of effort because it
  // requires a lot of context and only very slightly improves the accuracy
  // of this sizing seed. There are not many harps having fewer than 3 hole
  // octave spreads. Most have 4, but using 3 doesnt disrupt the layout too
  // much.
  const pessimisticGroupColumnnEstimate = 3
  const roughFullGroupCount = Math.ceil(
    harpfaceColumnCount / pessimisticGroupColumnnEstimate
  )
  const exteriorGutterCount = 2
  const includingHarpFaceEdgesGutterCount =
    roughFullGroupCount + exteriorGutterCount
  const dynamicWidthRequirements =
    longEdge /
    (columnWidth * harpfaceColumnCount +
      fragmentGutter * includingHarpFaceEdgesGutterCount +
      labelProtrusion +
      legendWidth +
      zoomSlideWidth)
  const dynamicHeightRequirements = (() => {
    const actualRowsHeight = shortEdge / (rowHeight * harpfaceRowCount)
    if (isChromaticHarpFace(layoutFacts))
      return actualRowsHeight + fragmentGutter
    return actualRowsHeight
  })()

  const dynamicSeedSize =
    dynamicWidthRequirements > dynamicHeightRequirements
      ? dynamicHeightRequirements
      : dynamicWidthRequirements

  const dynamicSizes: SizeScheme = {
    0: dynamicSeedSize * relativeSizes[0],
    1: dynamicSeedSize * relativeSizes[1],
    2: dynamicSeedSize * relativeSizes[2],
    3: dynamicSeedSize * relativeSizes[3],
    4: dynamicSeedSize * relativeSizes[4],
    5: dynamicSeedSize * relativeSizes[5],
    6: dynamicSeedSize * relativeSizes[6],
    7: dynamicSeedSize * relativeSizes[7],
    8: dynamicSeedSize * relativeSizes[8],
    9: dynamicSeedSize * relativeSizes[9],
    10: dynamicSeedSize * relativeSizes[10],
    11: dynamicSeedSize * relativeSizes[11],
    columnWidth: dynamicSeedSize * columnWidth,
    rowHeight: dynamicSeedSize * rowHeight,
    legendWidth: dynamicSeedSize * legendWidth,
    zoomSlideWidth: dynamicSeedSize * zoomSlideWidth,
    fragmentGutter: dynamicSeedSize * fragmentGutter,
    labelProtrusion: dynamicSeedSize * labelProtrusion,
    labelIconSize: dynamicSeedSize * labelIconSize,
  } as const

  if (prevSizes && prevSizes[0] === dynamicSizes[0]) return prevSizes
  return dynamicSizes
}
