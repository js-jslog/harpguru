import { useSizes } from '../../styles'

type OptionStyles = {
  largeFont: number
  smallFont: number
  superscriptFont: number
  largeGutter: number
  smallGutter: number
  internalGutter: number
  itemWidth: number
  itemHeightTrim: number
  highlightHeight: number
  highlightOffset: number
}

export const useOptionSizes = (): OptionStyles => {
  const { dynamicSizes } = useSizes()
  const { ['9']: largeFont } = dynamicSizes
  const { ['8']: smallFont } = dynamicSizes
  const { ['7']: superscriptFont } = dynamicSizes
  const { ['11']: largeGutter } = dynamicSizes
  const { ['9']: smallGutter } = dynamicSizes
  const { ['7']: internalGutter } = dynamicSizes
  const { ['10']: itemWidth } = dynamicSizes
  const { ['6']: itemHeightTrim } = dynamicSizes
  const { ['7']: highlightHeight } = dynamicSizes
  const { ['5']: highlightOffset } = dynamicSizes

  return {
    largeFont,
    smallFont,
    superscriptFont,
    largeGutter,
    smallGutter,
    internalGutter,
    itemWidth,
    itemHeightTrim,
    highlightHeight,
    highlightOffset,
  }
}
