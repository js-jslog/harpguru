import { useGlobal } from 'reactn'
import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

import { getSlideFacts } from '../../utils'
import { getColors } from '../../../../utils'

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
  const [dynamicSizes] = useGlobal('dynamicSizes')
  const { legendWidth, zoomSlideWidth } = dynamicSizes
  const { homeRowsColor } = getColors()
  const { slideLength } = getSlideFacts(trackBounds, columnCount)
  const styles = StyleSheet.create({
    track: {
      ...StyleSheet.absoluteFillObject,
      width: zoomSlideWidth,
      left: legendWidth,
    },
    slide: {
      ...StyleSheet.absoluteFillObject,
      width: zoomSlideWidth,
      height: slideLength,
      backgroundColor: homeRowsColor,
    },
    pointerLayer: {
      ...StyleSheet.absoluteFillObject,
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
      ...StyleSheet.absoluteFillObject,
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
