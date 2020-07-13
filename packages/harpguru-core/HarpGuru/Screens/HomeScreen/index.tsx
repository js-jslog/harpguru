import { StyleSheet, View } from 'react-native'
import React from 'react'

import { themeColors } from '../../Styles'
import { HarpFace } from '../../HarpFace'
import type { HarpFaceProps } from '../../HarpFace'

const { pageColor } = themeColors

const styles = StyleSheet.create({
  guruhome: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: pageColor,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
})

export const HomeScreen = (props: HarpFaceProps): React.ReactElement => {
  const { activeHarpStrata, activeDisplayMode, setActiveHarpStrata } = props

  const harpFaceProps = {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
  }

  return (
    <View style={styles.guruhome}>
      <HarpFace {...harpFaceProps} />
    </View>
  )
}
