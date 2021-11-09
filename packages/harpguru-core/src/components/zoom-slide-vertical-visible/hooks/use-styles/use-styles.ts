import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

import { getSlideFacts } from '../../utils'
import { getColors } from '../../../../utils'
import { useSizes } from '../../../../hooks'

export const useStyles = (
  trackBounds: readonly [number, number],
  columnCount: number
): ViewStyle => {
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
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  })
  return styles.componentWrapper
}
