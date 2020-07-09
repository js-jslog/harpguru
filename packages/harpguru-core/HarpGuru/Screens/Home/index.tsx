import { StyleSheet, View } from 'react-native'
import React from 'react'

import type { ScreenProps } from '../types'
import { themeColors } from '../../Styles'
import { HarpFace } from '../../HarpFace'


const { pageColor } = themeColors

const styles = StyleSheet.create({
  guruhome: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: pageColor,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  }
})

export const HomeScreen = (props: ScreenProps): React.ReactElement => {
  const { activeHarpStrata, activeDisplayMode, setActiveHarpStrata } = props

  const harpFaceProps = { activeHarpStrata, setActiveHarpStrata, activeDisplayMode }

  return (
    <View style={styles.guruhome}>
      <HarpFace {...harpFaceProps} />
    </View>
  )
}
