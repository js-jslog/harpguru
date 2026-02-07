import { View } from 'react-native'
import React, { useCallback } from 'react'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { getColors } from '../../utils'
import { ExperienceModes, MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { useHarpGuruStore, useHarpGuruStoreInstance } from '../../store'

import { getNewExperienceModeForDispatcher } from './utils'

type MenuTabExperienceModeProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const MenuTabExperienceMode = ({
  isLabelHidden,
  stashPosition,
}: MenuTabExperienceModeProps): React.ReactElement => {
  const activeExperienceMode = useHarpGuruStore(
    (state) => state.activeExperienceMode
  )
  const store = useHarpGuruStoreInstance()
  const nudgeExperienceMode = useCallback(() => {
    store.setState((state) => ({
      activeExperienceMode: getNewExperienceModeForDispatcher(
        state.activeExperienceMode
      ),
    }))
  }, [store])
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: isLabelHidden,
    stashPosition,
    openCloseMenu: () => nudgeExperienceMode(),
  }

  const dynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)
  const { harpguruGold } = getColors()

  const activeLabelIcon =
    activeExperienceMode === ExperienceModes.Explore ? (
      <MaterialCommunityIcons
        name="moon-full"
        size={dynamicSizes.labelIconSize}
        color={harpguruGold}
      />
    ) : (
      <FontAwesome
        name="question-circle"
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
