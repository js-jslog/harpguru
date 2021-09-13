import { useSizes } from '../../styles'

type OptionStyles = {
  largeFont: number
  smallFont: number
  superscriptFont: number
  largeGutter: number
  smallGutterDynamic: number
  smallGutterStatic: number
  internalGutter: number
  itemWidth: number
  itemHeightTrim: number
  highlightHeight: number
  highlightOffset: number
}

export const useOptionSizes = (): OptionStyles => {
  const { dynamicSizes, staticSizes } = useSizes()
  const { ['9']: largeFont } = staticSizes
  const { ['8']: smallFont } = staticSizes
  const { ['7']: superscriptFont } = staticSizes
  const { ['11']: largeGutter } = staticSizes
  const { ['9']: smallGutterDynamic } = dynamicSizes
  const { ['9']: smallGutterStatic } = staticSizes
  const { ['7']: internalGutter } = staticSizes
  const { ['10']: itemWidth } = staticSizes
  const { ['6']: itemHeightTrim } = staticSizes
  const { ['7']: highlightHeight } = staticSizes
  const { ['5']: highlightOffset } = staticSizes

  return {
    largeFont,
    smallFont,
    superscriptFont,
    largeGutter,
    smallGutterDynamic,
    smallGutterStatic,
    internalGutter,
    itemWidth,
    itemHeightTrim,
    highlightHeight,
    highlightOffset,
  }
}
