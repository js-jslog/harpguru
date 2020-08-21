import { useGlobal } from 'reactn'
import { StyleSheet } from 'react-native'
import { IsActiveIds } from 'harpstrata'

import { usePositionAnalysis } from '../use-position-analysis'
import { HarpCellStyles, YXCoord } from '../../harp-cell'
import { ExperienceModes } from '../../../../types'
import { getSizes, colors } from '../../../../styles'

export const useStyles = (yxCoord: YXCoord): HarpCellStyles => {
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const positionFacts = usePositionAnalysis(yxCoord)

  const sizes = getSizes()
  const {
    1: borderWidth,
    6: borderRadius,
    2: elevation,
    7: noteFontSize,
    5: modifierTopMargin,
    6: modifierFontSize,
  } = sizes
  const width = sizes['8'] + sizes['5']
  const height = sizes['8'] + sizes['5']
  const { pageColor, degreeColors, inertOutline: borderColor } = colors
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
    naturalContentsWrapper: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sharpContentsWrapper: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: sizes['5'],
      right: sizes['7'],
    },
    flatContentsWrapper: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      top: sizes['5'],
      left: sizes['6'],
    },
    note: {
      display: isQuizMode && !isActive ? 'none' : 'flex',
      color: isActive ? pageColor : borderColor,
      fontSize: noteFontSize,
    },
    modifier: {
      bottom: modifierTopMargin,
      left: modifierTopMargin,
      display: isQuizMode && !isActive ? 'none' : 'flex',
      color: isActive ? pageColor : borderColor,
      fontSize: modifierFontSize,
    },
  })

  return styles
}
