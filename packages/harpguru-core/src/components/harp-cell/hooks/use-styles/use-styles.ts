import { useGlobal } from 'reactn'
import { StyleSheet } from 'react-native'
import { IsActiveIds } from 'harpstrata'

import { usePositionAnalysis } from '../use-position-analysis'
import { HarpCellStyles, YXCoord } from '../../harp-cell'
import { ExperienceModes } from '../../../../types'
import { sizes, colors } from '../../../../styles'

const {
  1: borderWidth,
  5: borderRadius,
  8: height,
  8: width,
  2: elevation,
} = sizes
const { 7: noteFontSize, 6: modifierFontSize } = sizes
const { pageColor, degreeColors, inertOutline: borderColor } = colors

export const useStyles = (yxCoord: YXCoord): HarpCellStyles => {
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const positionFacts = usePositionAnalysis(yxCoord)
  const { thisDegreeId, thisIsActiveId } = positionFacts
  const isActive = thisIsActiveId === IsActiveIds.Active
  const isQuizMode = activeExperienceMode === ExperienceModes.Quiz
  const cellColor =
    isActive && thisDegreeId ? degreeColors[thisDegreeId] : pageColor

  const styles = StyleSheet.create<HarpCellStyles>({
    cell: {
      flexDirection: 'row',
      backgroundColor: cellColor,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: isActive ? elevation : 0,
      borderRadius,
      borderWidth: thisDegreeId ? borderWidth : 0,
      borderColor: isActive ? cellColor : borderColor,
      width,
      height,
    },
    note: {
      display: isQuizMode && !isActive ? 'none' : 'flex',
      color: isActive ? pageColor : borderColor,
      fontSize: noteFontSize,
    },
    modifier: {
      display: isQuizMode && !isActive ? 'none' : 'flex',
      alignSelf: 'flex-start',
      color: isActive ? pageColor : borderColor,
      fontSize: modifierFontSize,
    },
  })

  return styles
}
