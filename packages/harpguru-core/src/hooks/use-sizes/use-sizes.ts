import { useGlobal } from 'reactn'

import { getWindowDimensions } from '../../packages/get-window-dimensions'

import { SizeScheme, SizeSchemes } from './use-sizes-types'

// Here's what we need this hook to provide:
// 1. A set of sizes which updates as the number of columns being presented increases (which is also *possibly* sensitive to the number of rows present too)
// 2. A set of sizes which do not update as the number of columns being presented increases
//
// 1. is for the harpface, the left hand legend and the menu tabs. I want all of these to be harmoneously sized together. If you have the eyesight or the screen size to present all the holes at the same time then you can afford the side panel info to scale along with it
// 2. is for the menu contents. The text is already large, and nicely so. We don't need it to be bigger or smaller, and having it scale is not the same harmoneous thing as the main page. I want the guttering to move with the main page though so that the left menu items are
// never obscuring what you can see in the left hand legend
// 2. may also need to be used in the quiz mode.. it looks like the quiz mode might be behaving strangely now.. the question isn't always displayed. Perhaps that's caused by something else, but it doesn't make sense that the quiz question or the other notifications for that matter should be scaled.

const relativeSizes: Omit<
  SizeScheme,
  | 'columnWidth'
  | 'rowHeight'
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

export const useSizes = (): SizeSchemes => {
  const { shortEdge, longEdge } = getWindowDimensions()
  const [layoutFacts] = useGlobal('layoutFacts')
  const {
    harpfaceColumns: harpFaceColumnCount,
    harpfaceRows: harpFaceRowCount,
  } = layoutFacts

  const {
    [relativeColumnWidth]: columnWidth,
    [relativeFragmentGutterWidth]: fragmentGutter,
    [relativeLabelProtrusion]: labelProtrusion,
    [relativeLabelIconSize]: labelIconSize,
  } = relativeSizes
  const rowHeight = columnWidth
  const zoomSlideWidth = columnWidth
  const labelGrace = fragmentGutter

  // TODO: It might be better to either count the number of gutters
  // or base this as a proportion of the number of columns since
  // this number won't work well as the number of columns and
  // therefore gutters increases.
  // We could also set this to 0 if the no-fragment mode is
  // selected. This would mean that the cell size would grow
  // when they left fragment mode. That would have advantages
  // and disadvantages.
  const roughFragmentGutterCount = 3
  const sidesContainingLabelsCount = 2
  const dynamicWidthRequirements =
    longEdge /
    (columnWidth * harpFaceColumnCount +
      fragmentGutter * roughFragmentGutterCount +
      labelProtrusion * sidesContainingLabelsCount +
      labelGrace * sidesContainingLabelsCount +
      zoomSlideWidth)
  const dynamicHeightRequirements = shortEdge / (rowHeight * harpFaceRowCount)

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
    zoomSlideWidth: dynamicSeedSize * zoomSlideWidth,
    fragmentGutter: dynamicSeedSize * fragmentGutter,
    labelProtrusion: dynamicSeedSize * labelProtrusion,
    labelIconSize: dynamicSeedSize * labelIconSize,
  } as const

  const staticEquivalentColumnCount = 12
  const staticSeedSize =
    longEdge /
    (columnWidth * staticEquivalentColumnCount +
      fragmentGutter * roughFragmentGutterCount +
      labelProtrusion * sidesContainingLabelsCount +
      labelGrace * sidesContainingLabelsCount)

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
    columnWidth: staticSeedSize * columnWidth,
    rowHeight: staticSeedSize * rowHeight,
    zoomSlideWidth: staticSeedSize * zoomSlideWidth,
    fragmentGutter: staticSeedSize * fragmentGutter,
    labelProtrusion: staticSeedSize * labelProtrusion,
    labelIconSize: staticSeedSize * labelIconSize,
  } as const

  return {
    dynamicSizes,
    staticSizes,
  }
}
