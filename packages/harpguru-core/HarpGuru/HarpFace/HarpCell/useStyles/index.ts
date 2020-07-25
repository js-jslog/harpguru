import { useGlobal } from 'reactn'
import { StyleSheet } from 'react-native'
import { IsActiveIds } from 'harpstrata'

import { usePositionAnalysis } from '../usePositionAnalysis'
import { HarpCellStyles, YXCoord } from '../types'
import { ExperienceModes } from '../../../helpers/setGlobalReactNState'
import { themeSizes, themeColors } from '../../../Theme'

const {
  1: borderWidth,
  5: borderRadius,
  8: height,
  8: width,
  2: elevation,
} = themeSizes
const { 7: noteFontSize, 6: modifierFontSize } = themeSizes
const { pageColor, degreeColors, inertOutline: borderColor } = themeColors

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
