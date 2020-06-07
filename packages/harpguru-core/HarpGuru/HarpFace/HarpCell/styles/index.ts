import { StyleSheet } from 'react-native'
import { IsActiveIds } from 'harpstrata'

import { HarpCellProps, HarpCellStyles } from '../types'
import { analysePosition } from '../analysePosition'
import type { PositionFacts } from '../analysePosition'
import { themeSizes, themeColors } from '../../../Styles'


const { 1: borderWidth, 5: borderRadius, 8: height, 8: width, 2: elevation } = themeSizes
const { 6: fontSize } = themeSizes
const { pageColor, degreeColors, inertOutline: borderColor } = themeColors

export const getStyles = (props: HarpCellProps): HarpCellStyles => {
  const positionFacts: PositionFacts = analysePosition(props)
  const { thisDegree, thisIsActive} = positionFacts
  const { id: degreeId } = thisDegree || { id: undefined }
  const isActive = (thisIsActive === IsActiveIds.Active)
  const cellColor = (isActive && degreeId) ? degreeColors[degreeId] : pageColor

  const styles = StyleSheet.create<HarpCellStyles>({
    cell: {
      backgroundColor: cellColor,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: (isActive) ? elevation : 0,
      borderRadius,
      borderWidth: (degreeId) ? borderWidth : 0,
      borderColor: (isActive) ? cellColor : borderColor,
      width,
      height,
    },
    text: {
      color: (isActive) ? pageColor : borderColor,
      fontSize,
    },
  })

  return styles
}
