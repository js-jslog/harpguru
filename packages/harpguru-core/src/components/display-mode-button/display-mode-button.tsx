import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import { MenuOpenButton } from '../menu-open-button'
import { Menu } from '../menu'
import { DisplayModes, MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { getSizes, harpguruColors } from '../../styles'

type DisplayModeButtonProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const DisplayModeButton = ({
  isLabelHidden,
  stashPosition,
}: DisplayModeButtonProps): React.ReactElement => {
  // This line only exists to make sure that this tab rerenders
  // when the harpstrata changes just like the other menu tabs
  // if it doesn't then it's possible that the tabs' protrusions
  // will become unequal after the screen is resized.
  // This is really a hacky workaround, but it's cheap and effective.
  // eslint-disable-next-line no-empty-pattern
  const [] = useGlobal('activeHarpStrata')
  const [activeDisplayMode, setActiveDisplayMode] = useGlobal(
    'activeDisplayMode'
  )
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: isLabelHidden,
    stashPosition,
    openCloseMenu:
      activeDisplayMode === DisplayModes.Pitch
        ? () => setActiveDisplayMode(DisplayModes.Degree)
        : () => setActiveDisplayMode(DisplayModes.Pitch),
  }

  const sizes = getSizes()

  return (
    <Menu {...menuLikeProps} overrideBackgroundColor={true}>
      <MenuOpenButton {...menuLikeProps}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <MaterialIcons
            name="music-note"
            size={sizes['7']}
            color={harpguruColors['gold']}
          />
        </View>
      </MenuOpenButton>
    </Menu>
  )
}
