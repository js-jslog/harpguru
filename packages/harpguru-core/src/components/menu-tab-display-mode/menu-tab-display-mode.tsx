import { useDispatch } from 'reactn'
import { View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { harpguruColors } from '../../styles'
import { useSizes } from '../../hooks'

import { getNewDisplayModeForDispatcher } from './utils'

type MenuTabDisplayModeProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const MenuTabDisplayMode = ({
  isLabelHidden,
  stashPosition,
}: MenuTabDisplayModeProps): React.ReactElement => {
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

  const { dynamicSizes } = useSizes()

  const activeLabelIcon = (
    <MaterialIcons
      name="music-note"
      size={dynamicSizes.labelIconSize}
      color={harpguruColors['gold']}
    />
  )

  return (
    <Menu {...menuLikeProps}>
      <MenuAccessOpen {...menuLikeProps}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {activeLabelIcon}
        </View>
      </MenuAccessOpen>
    </Menu>
  )
}
