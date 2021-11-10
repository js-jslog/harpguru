import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

import { getSlideFacts } from '../../utils'
import { getColors } from '../../../../utils'
import { useSizes } from '../../../../hooks'

type Styles = {
  readonly componentWrapper: ViewStyle
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
  const { inertOutline } = getColors()
  const { slideLength } = getSlideFacts(trackBounds, columnCount)
  const styles = StyleSheet.create({
    componentWrapper: {
      ...StyleSheet.absoluteFillObject,
      width: dynamicSizes.zoomSlideWidth,
      left: dynamicSizes['9'], // legend width is going to have to become a named variable
      height: slideLength,
      backgroundColor: inertOutline,
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
    componentWrapper,
    pointerLayer,
    topPointer,
    bottomPointer,
    labelLayer,
  } = styles

  return {
    componentWrapper,
    pointerLayer,
    topPointer,
    bottomPointer,
    labelLayer,
  }
}
