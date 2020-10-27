import { View, StyleSheet } from 'react-native'
import React from 'react'

import { MenuCloseButton } from '../menu-close-button'
import { getStaticMenuValues } from '../../utils'

type MenuFaceProps = {
  readonly children: React.ReactNode
  readonly openCloseTapHandler: () => void
}

export const MenuFace = ({
  children,
  openCloseTapHandler,
}: MenuFaceProps): React.ReactElement => {
  const { labelProtrusion } = getStaticMenuValues()
  const styles = StyleSheet.create({
    mainContents: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      left: labelProtrusion,
    },
  })
  return (
    <View style={styles.mainContents}>
      {children}
      <MenuCloseButton openCloseTapHandler={openCloseTapHandler} />
    </View>
  )
}
