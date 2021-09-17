import { View, StyleSheet } from 'react-native'
import React from 'react'

import { MenuAccessClose } from '../menu-access-close'
import type { MenuProps, ChildrenProps } from '../../types'
import { useScaledMenuLabelProtrusion } from '../../hooks/'

export const MenuFace = ({
  openCloseMenu,
  children,
}: MenuProps & ChildrenProps): React.ReactElement => {
  const scaledLabelProtrusion = useScaledMenuLabelProtrusion()
  const { style } = StyleSheet.create({
    style: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      left: scaledLabelProtrusion,
    },
  })
  return (
    <View style={style}>
      {children}
      <MenuAccessClose openCloseMenu={openCloseMenu} />
    </View>
  )
}
