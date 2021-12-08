import { useGlobal } from 'reactn'

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
  const [dynamicSizes] = useGlobal('dynamicSizes')
  const [staticSizes] = useGlobal('staticSizes')
  const { ['9']: largeFont } = staticSizes
  const { ['8']: smallFont } = staticSizes
  const { ['7']: superscriptFont } = staticSizes
  const { ['11']: largeGutter } = staticSizes
  const { ['9']: smallGutter } = dynamicSizes
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
    smallGutter,
    internalGutter,
    itemWidth,
    itemHeightTrim,
    highlightHeight,
    highlightOffset,
  }
}
