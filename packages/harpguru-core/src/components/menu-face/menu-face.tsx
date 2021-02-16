import { View, StyleSheet } from 'react-native'
import React from 'react'

import { MenuAccessClose } from '../menu-access-close'
import { getScaledMenuLabelProtrusion } from '../../utils/'
import type { MenuProps, ChildrenProps } from '../../types'

export const MenuFace = ({
  openCloseMenu,
  children,
}: MenuProps & ChildrenProps): React.ReactElement => {
  const scaledLabelProtrusion = getScaledMenuLabelProtrusion()
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
