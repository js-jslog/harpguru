import { useGlobal, useDispatch } from 'reactn'
import { View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

import { MenuOpenButton } from '../menu-open-button'
import { Menu } from '../menu'
import { ExperienceModes, MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { getSizes, harpguruColors } from '../../styles'

import { getNewExperienceModeForDispatcher } from './utils'

type ExperienceModeButtonProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const ExperienceModeButton = ({
  isLabelHidden,
  stashPosition,
}: ExperienceModeButtonProps): React.ReactElement => {
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

  const sizes = getSizes()

  const activeLabelIcon =
    activeExperienceMode === ExperienceModes.Explore ? (
      <MaterialCommunityIcons
        name="moon-full"
        size={sizes.labelIconSize}
        color={harpguruColors['gold']}
      />
    ) : (
      <FontAwesome
        name="question-circle"
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
