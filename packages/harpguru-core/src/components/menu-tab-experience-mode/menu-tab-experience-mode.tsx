import { useGlobal, useDispatch } from 'reactn'
import { View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { ExperienceModes, MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { useSizes, harpguruColors } from '../../styles'

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

  const activeLabelIcon =
    activeExperienceMode === ExperienceModes.Explore ? (
      <MaterialCommunityIcons
        name="moon-full"
        size={dynamicSizes.labelIconSize}
        color={harpguruColors['gold']}
      />
    ) : (
      <FontAwesome
        name="question-circle"
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
