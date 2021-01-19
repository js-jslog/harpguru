import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'

import { MenuOpenButton } from '../menu-open-button'
import { Menu } from '../menu'
import { MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { getSizes, harpguruColors } from '../../styles'

import { useToggleFragmentHarpFace } from './hooks'

type FragmentationButtonProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const FragmentationButton = ({
  isLabelHidden,
  stashPosition,
}: FragmentationButtonProps): React.ReactElement => {
  // This line only exists to make sure that this tab rerenders
  // when the harpstrata changes just like the other menu tabs
  // if it doesn't then it's possible that the tabs' protrusions
  // will become unequal after the screen is resized.
  // This is really a hacky workaround, but it's cheap and effective.
  // eslint-disable-next-line no-empty-pattern
  const [] = useGlobal('activeHarpStrata')
  const [fragmentHarpFaceByOctaves] = useGlobal('fragmentHarpFaceByOctaves')
  const toggleFragmentHarpFace = useToggleFragmentHarpFace()
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: isLabelHidden,
    stashPosition,
    openCloseMenu: () => toggleFragmentHarpFace(),
  }

  const sizes = getSizes()

  const activeLabelIcon =
    fragmentHarpFaceByOctaves === true ? (
      <MaterialIcons
        name="view-column"
        size={sizes.labelIconSize}
        color={harpguruColors['gold']}
      />
    ) : (
      <FontAwesome
        name="square"
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
