import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import type { HoleNumberIds, HoleNumberProps } from '../types'
import { themeSizes, themeColors } from '../../../Styles'

const { 5: fontSize, 8: width } = themeSizes
const { holeNumbersColor } = themeColors

export function HoleNumber(props: HoleNumberProps): ReactElement {
  const { xCoord } = props
  const holeNumber: HoleNumberIds = `${xCoord + 1}` as HoleNumberIds

  const styles = StyleSheet.create({
    cell: {
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height: 0,
    },
    text: {
      fontSize,
      color: holeNumbersColor,
    },
  })

  return (
    <View style={styles.cell}>
      <Text style={styles.text}>{holeNumber}</Text>
    </View>
  )
}
