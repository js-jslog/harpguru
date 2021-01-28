import { useWindowDimensions } from 'use-dimensions'
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
  useWindowDimensions()
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
