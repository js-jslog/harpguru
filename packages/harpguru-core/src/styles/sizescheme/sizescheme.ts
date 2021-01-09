import { SizeScheme } from '../styles-types'

const relativeSizes: Omit<
  SizeScheme,
  'columnWidth' | 'rowHeight' | 'fragmentGutter' | 'labelProtrusion'
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
} as const

const relativeColumnWidth = 9
const relativeFragmentGutterWidth = 7
const relativeLabelProtrusion = 9

type Dimensions = {
  readonly width: number
  readonly height: number
}

export const getSizes = (dimensions: Dimensions): SizeScheme => {
  const { width: windowWidth, height: windowHeight } = dimensions
  const deviceWidth = windowWidth > windowHeight ? windowWidth : windowHeight
  const deviceHeight = windowHeight < windowWidth ? windowHeight : windowWidth

  const {
    [relativeColumnWidth]: columnWidth,
    [relativeFragmentGutterWidth]: fragmentGutter,
    [relativeLabelProtrusion]: labelProtrusion,
  } = relativeSizes
  const rowHeight = columnWidth
  const labelGrace = fragmentGutter

  const widthRequirements =
    deviceWidth /
    (columnWidth * 10 +
      fragmentGutter * 3 +
      labelProtrusion * 2 +
      labelGrace * 2)
  const heightRequirements = deviceHeight / (rowHeight * 7)

  const seedSize =
    widthRequirements > heightRequirements
      ? heightRequirements
      : widthRequirements

  const absoluteSizes: SizeScheme = {
    0: seedSize * relativeSizes[0],
    1: seedSize * relativeSizes[1],
    2: seedSize * relativeSizes[2],
    3: seedSize * relativeSizes[3],
    4: seedSize * relativeSizes[4],
    5: seedSize * relativeSizes[5],
    6: seedSize * relativeSizes[6],
    7: seedSize * relativeSizes[7],
    8: seedSize * relativeSizes[8],
    9: seedSize * relativeSizes[9],
    10: seedSize * relativeSizes[10],
    columnWidth: seedSize * columnWidth,
    rowHeight: seedSize * columnWidth,
    fragmentGutter: seedSize * fragmentGutter,
    labelProtrusion: seedSize * labelProtrusion,
  } as const

  return absoluteSizes
}
