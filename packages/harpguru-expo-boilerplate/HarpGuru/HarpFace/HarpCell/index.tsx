import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { getHarpStrata, IsActiveIds } from 'harpstrata'
import type { HarpStrata, HarpStrataProps, DegreeIds } from 'harpstrata'

import { DisplayModes } from '../HarpFace'
import { themeSizes, themeColors } from '../../Styles'

import { getToggledActiveDegreeIds } from './getToggledActiveDegreeIds'
import { analysePosition } from './analysePosition'
import type { PositionFacts } from './analysePosition'

import {HarpCellProps} from './types'

const setNewHarpStrata = (activeHarpStrata: HarpStrata, setActiveHarpStrata: (activeHarpStrata: HarpStrata) => void, toggledDegreeId: DegreeIds): void => {
  const { apparatus: { id: apparatusId }, pozitionId, harpKeyId, isActiveComplex: { activeDegreeIds }} = activeHarpStrata

  const newActiveDegreeIds = getToggledActiveDegreeIds(toggledDegreeId, activeDegreeIds)
  const activeIds = newActiveDegreeIds

  const newHarpStrataProps: HarpStrataProps = {
    apparatusId, pozitionId, harpKeyId, activeIds
  }
  const newHarpStrata = getHarpStrata(newHarpStrataProps)
  setActiveHarpStrata(newHarpStrata)

}

export const HarpCell = (props: HarpCellProps): React.ReactElement => {
  const positionFacts: PositionFacts = analysePosition(props)
  const { setActiveHarpStrata, activeHarpStrata, activeDisplayMode } = props
  const { thisDegree, thisPitch, thisIsActive} = positionFacts
  const { id: degreeId } = thisDegree || { id: undefined }
  const { id: pitchId } = thisPitch || { id: undefined }
  const isActive = (thisIsActive === IsActiveIds.Active)

  const displayValue = (activeDisplayMode === DisplayModes.Degree ? degreeId : pitchId)

  const { 1: borderWidth, 5: borderRadius, 8: height, 8: width, 2: elevation } = themeSizes
  const { 6: fontSize } = themeSizes
  const { pageColor, degreeColors, inertOutline: borderColor } = themeColors
  const cellColor = (isActive && degreeId) ? degreeColors[degreeId] : pageColor

  const styles = StyleSheet.create({
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


  const toggleActiveIdsIfHoleExists = (): void => {
    if (degreeId === undefined) return
    setNewHarpStrata(activeHarpStrata, setActiveHarpStrata, degreeId)
  }

  const accessibleContent = 
  <TouchableOpacity
    accessible={true}
    accessibilityRole='button'
    onPress={(): void => toggleActiveIdsIfHoleExists()}>
    <View style={styles.cell}>
      <Text style={styles.text}>
        {displayValue}
      </Text>
    </View>
  </TouchableOpacity>

  const inAccessibleContent = 
  <TouchableOpacity disabled={true} accessible={false} style={styles.cell} >
    <View style={styles.cell} />
  </TouchableOpacity>

  const content = (thisDegree === undefined ? inAccessibleContent : accessibleContent)

  return content
}

export type { YXCoord } from './types'
