import { View, StyleSheet } from 'react-native'
import React from 'react'

import { MenuCloseButton } from '../menu-close-button'
import { getScaledMenuLabelProtrusion } from '../../utils/'
import type { MenuProps, ChildrenProps } from '../../types'

export const MenuFace = ({
  children,
  openCloseTapHandler,
}: MenuProps & ChildrenProps): React.ReactElement => {
  const scaledLabelProtrusion = getScaledMenuLabelProtrusion()
  const styles = StyleSheet.create({
    mainContents: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      left: scaledLabelProtrusion,
    },
  })
  return (
    <View style={styles.mainContents}>
      {children}
      <MenuCloseButton openCloseTapHandler={openCloseTapHandler} />
    </View>
  )
}
