import { useGlobal, useDispatch } from 'reactn'
import { View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { getColors } from '../../utils'
import { ExperienceModes, MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { useSizes } from '../../hooks'

import { getNewExperienceModeForDispatcher } from './utils'

type MenuTabExperienceModeProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const MenuTabExperienceMode = ({
  isLabelHidden,
  stashPosition,
}: MenuTabExperienceModeProps): React.ReactElement => {
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const nudgeExperienceMode = useDispatch(
    getNewExperienceModeForDispatcher,
    'activeExperienceMode'
  )
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: isLabelHidden,
    stashPosition,
    openCloseMenu: () => nudgeExperienceMode(),
  }

  const { dynamicSizes } = useSizes()
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
