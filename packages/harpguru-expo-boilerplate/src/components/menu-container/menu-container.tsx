import { View, StyleSheet } from 'react-native'
import React, { ReactNode, ReactElement } from 'react'

import { colors } from '../../styles'

export const styles = StyleSheet.create({
  menuContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    backgroundColor: colors.inertOutline,
  },
})

export const MenuContainer = ({
  children,
}: {
  readonly children: ReactNode
}): ReactElement => {
  return <View style={styles.menuContainer}>{children}</View>
}
