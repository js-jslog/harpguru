import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

import { MenuOpenButton } from '../menu-open-button'
import { Menu } from '../menu'
import { ExperienceModes, MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { harpguruColors } from '../../styles'
import { useSizes } from '../../hooks'

import { useNudgeExperienceMode } from './hooks'

type ExperienceModeButtonProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const ExperienceModeButton = ({
  isLabelHidden,
  stashPosition,
}: ExperienceModeButtonProps): React.ReactElement => {
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const nudgeExperienceMode = useNudgeExperienceMode()
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: isLabelHidden,
    stashPosition,
    openCloseMenu: () => nudgeExperienceMode('DOWN'),
  }

  const sizes = useSizes()

  const activeLabelIcon =
    activeExperienceMode === ExperienceModes.Explore ? (
      <MaterialCommunityIcons
        name="moon-full"
        size={sizes['7']}
        color={harpguruColors['gold']}
      />
    ) : (
      <FontAwesome
        name="question-circle"
        size={sizes['7']}
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
