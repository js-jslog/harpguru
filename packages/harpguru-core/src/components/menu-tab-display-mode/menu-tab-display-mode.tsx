import { useDispatch } from 'reactn'
import { View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import { MenuOpenButton } from '../menu-open-button'
import { Menu } from '../menu'
import { MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { getSizes, harpguruColors } from '../../styles'

import { getNewDisplayModeForDispatcher } from './utils'

type DisplayModeButtonProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const MenuTabDisplayMode = ({
  isLabelHidden,
  stashPosition,
}: DisplayModeButtonProps): React.ReactElement => {
  const nudgeDisplayMode = useDispatch(
    getNewDisplayModeForDispatcher,
    'activeDisplayMode'
  )
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: isLabelHidden,
    stashPosition,
    openCloseMenu: () => nudgeDisplayMode(),
  }

  const sizes = getSizes()

  const activeLabelIcon = (
    <MaterialIcons
      name="music-note"
      size={sizes.labelIconSize}
      color={harpguruColors['gold']}
    />
  )

  return (
    <Menu {...menuLikeProps}>
      <MenuOpenButton {...menuLikeProps}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {activeLabelIcon}
        </View>
      </MenuOpenButton>
    </Menu>
  )
}
