import { Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

export const ScalesMenu = (menuProps: MenuProps): React.ReactElement => {
  const sizes = getSizes()

  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <Text>This is a test</Text>
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <MaterialIcons
          name="linear-scale"
          size={sizes['7']}
          color={colors.homeRowsColor}
        />
      </MenuOpenButton>
    </Menu>
  )
}
