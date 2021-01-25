import { getSizes } from '../../styles'

type OptionStyles = {
  largeFont: number
  smallFont: number
  itemWidth: number
  itemHeightTrim: number
  largeGutter: number
  smallGutter: number
  internalGutter: number
  highlightHeight: number
  highlightOffset: number
  superscriptFont: number
}

export const getOptionStyles = (): OptionStyles => {
  const sizes = getSizes()
  const { ['9']: largeFont } = sizes
  const { ['8']: smallFont } = sizes
  const { ['7']: superscriptFont } = sizes
  const { ['10']: itemWidth } = sizes
  const { ['6']: itemHeightTrim } = sizes
  const { ['7']: highlightHeight } = sizes
  const { ['5']: highlightOffset } = sizes
  const { ['11']: largeGutter } = sizes
  const { ['7']: internalGutter } = sizes
  const { ['9']: smallGutter } = sizes

  return {
    largeFont,
    smallFont,
    itemWidth,
    itemHeightTrim,
    largeGutter,
    smallGutter,
    internalGutter,
    highlightHeight,
    highlightOffset,
    superscriptFont,
  }
}
