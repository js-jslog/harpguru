import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'
import { IsActiveIds } from 'harpstrata'

import { usePositionAnalysis } from '../use-position-analysis'
import { YXCoord } from '../../harp-cell'
import { getSizes, colors } from '../../../../styles'

export type HarpCellStyles = {
  readonly cell: ViewStyle
}

export const useStyles = (yxCoord: YXCoord): HarpCellStyles => {
  const positionFacts = usePositionAnalysis(yxCoord)

  const sizes = getSizes()
  const { 1: borderWidth, 6: borderRadius, 2: elevation } = sizes
  const width = sizes['8'] + sizes['5']
  const height = sizes['8'] + sizes['5']
  const { pageColor, degreeColors, inertOutline, activeOutline } = colors
  const { thisDegreeId, thisIsActiveId } = positionFacts
  const isActive = thisIsActiveId === IsActiveIds.Active
  const cellColor =
    isActive && thisDegreeId ? degreeColors[thisDegreeId] : pageColor

  const styles = StyleSheet.create({
    cell: {
      flexDirection: 'row',
      backgroundColor: cellColor,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: isActive ? elevation : 0,
      borderRadius,
      borderWidth: thisDegreeId ? borderWidth : 0,
      borderColor: isActive ? activeOutline : inertOutline,
      width,
      height,
    },
  })

  return styles
}
