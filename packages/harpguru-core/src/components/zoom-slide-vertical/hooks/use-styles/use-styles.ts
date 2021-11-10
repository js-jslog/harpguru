import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

import { getSlideFacts } from '../../utils'
import { getColors } from '../../../../utils'
import { useSizes } from '../../../../hooks'

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
  const { dynamicSizes } = useSizes()
  const { homeRowsColor } = getColors()
  const { slideLength } = getSlideFacts(trackBounds, columnCount)
  const styles = StyleSheet.create({
    track: {
      ...StyleSheet.absoluteFillObject,
      width: dynamicSizes.zoomSlideWidth,
      left: dynamicSizes['9'], // legend width is going to have to become a named variable
    },
    slide: {
      ...StyleSheet.absoluteFillObject,
      width: dynamicSizes.zoomSlideWidth,
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
      bottom: dynamicSizes['9'],
    },
    bottomPointer: {
      top: dynamicSizes['9'],
    },
    labelLayer: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  })
  const {
    track,
    slide,
    pointerLayer,
    topPointer,
    bottomPointer,
    labelLayer,
  } = styles

  return {
    track,
    slide,
    pointerLayer,
    topPointer,
    bottomPointer,
    labelLayer,
  }
}
