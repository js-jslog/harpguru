import { StyleSheet, View } from 'react-native'
import React from 'react'

import { themeColors } from '../../Theme'
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
  const { activeDisplayMode } = props

  const harpFaceProps = {
    activeDisplayMode,
  }

  return (
    <View style={styles.guruhome}>
      <HarpFace {...harpFaceProps} />
    </View>
  )
}
