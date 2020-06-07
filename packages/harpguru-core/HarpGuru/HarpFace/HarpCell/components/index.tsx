import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { HarpCellProps } from '../types'
import { getStyles } from '../styles'
import { setNewHarpStrata } from '../setNewHarpStrata'
import { getDisplayValue } from '../getDisplayValue'
import { analysePosition } from '../analysePosition'

export const HarpCell = (props: HarpCellProps): React.ReactElement => {
  const { setActiveHarpStrata, activeHarpStrata } = props
  const positionFacts = analysePosition(props)
  const { thisDegree } = positionFacts
  const { id: degreeId } = thisDegree || { id: undefined }

  const displayValue = getDisplayValue(props)

  const styles = getStyles(props)

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
