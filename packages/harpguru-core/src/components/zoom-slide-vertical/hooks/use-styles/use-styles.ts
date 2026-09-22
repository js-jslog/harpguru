import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

import { getSlideFacts } from '../../utils'
import { getColors } from '../../../../utils'
import { useHarpGuruStore } from '../../../../store'

type Styles = {
  readonly track: ViewStyle
  readonly slide: ViewStyle
  readonly pointerLayer: ViewStyle
  readonly topPointer: ViewStyle
  readonly bottomPointer: ViewStyle
  readonly labelLayer: ViewStyle
}
export const useStyles = (
  trackBounds: readonly [number, number],
  columnCount: number
): Styles => {
  const dynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)
  const { legendWidth, zoomSlideWidth } = dynamicSizes
  const { homeRowsColor } = getColors()
  const { slideLength } = getSlideFacts(trackBounds, columnCount)
  const styles = StyleSheet.create({
    track: {
      ...StyleSheet.absoluteFill,
      width: zoomSlideWidth,
      left: legendWidth,
    },
    slide: {
      ...StyleSheet.absoluteFill,
      width: zoomSlideWidth,
      height: slideLength,
      backgroundColor: homeRowsColor,
    },
    pointerLayer: {
      ...StyleSheet.absoluteFill,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    topPointer: {
      bottom: zoomSlideWidth,
    },
    bottomPointer: {
      top: zoomSlideWidth,
    },
    labelLayer: {
      ...StyleSheet.absoluteFill,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  })
  const { track, slide, pointerLayer, topPointer, bottomPointer, labelLayer } =
    styles

  return {
    track,
    slide,
    pointerLayer,
    topPointer,
    bottomPointer,
    labelLayer,
  }
}
