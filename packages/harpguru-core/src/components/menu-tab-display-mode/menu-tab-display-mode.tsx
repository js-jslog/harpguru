import { View } from 'react-native'
import React, { useCallback } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { getColors } from '../../utils'
import { MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { useHarpGuruStore, useHarpGuruStoreInstance } from '../../store'

import { getNewDisplayModeForDispatcher } from './utils'

type MenuTabDisplayModeProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const MenuTabDisplayMode = ({
  isLabelHidden,
  stashPosition,
}: MenuTabDisplayModeProps): React.ReactElement => {
  const store = useHarpGuruStoreInstance()
  const nudgeDisplayMode = useCallback(() => {
    store.setState((state) => ({
      activeDisplayMode: getNewDisplayModeForDispatcher(state.activeDisplayMode),
    }))
  }, [store])
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: isLabelHidden,
    stashPosition,
    openCloseMenu: () => nudgeDisplayMode(),
  }

  const dynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)
  const { harpguruGold } = getColors()

  const activeLabelIcon = (
    <MaterialIcons
      name="music-note"
      size={dynamicSizes.labelIconSize}
      color={harpguruGold}
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
