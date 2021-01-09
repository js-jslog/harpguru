import { View } from 'react-native'
import React from 'react'
import { useDimensions } from '@react-native-community/hooks'
import { MaterialIcons } from '@expo/vector-icons'

import { MenuOpenButton } from '../menu-open-button'
import { Menu } from '../menu'
import { MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { getSizes, harpguruColors } from '../../styles'

import { useNudgeDisplayMode } from './hooks'

type DisplayModeButtonProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const DisplayModeButton = ({
  isLabelHidden,
  stashPosition,
}: DisplayModeButtonProps): React.ReactElement => {
  const nudgeDisplayMode = useNudgeDisplayMode()
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: isLabelHidden,
    stashPosition,
    openCloseMenu: () => nudgeDisplayMode('DOWN'),
  }

  const sizes = getSizes(useDimensions().window)

  const activeLabelIcon = (
    <MaterialIcons
      name="music-note"
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
