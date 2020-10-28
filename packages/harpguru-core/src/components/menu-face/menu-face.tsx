import { View, StyleSheet } from 'react-native'
import React from 'react'

import { MenuCloseButton } from '../menu-close-button'
import { getScaledMenuLabelProtrusion } from '../../utils/'

type MenuFaceProps = {
  readonly children: React.ReactNode
  readonly openCloseTapHandler: () => void
}

export const MenuFace = ({
  children,
  openCloseTapHandler,
}: MenuFaceProps): React.ReactElement => {
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
