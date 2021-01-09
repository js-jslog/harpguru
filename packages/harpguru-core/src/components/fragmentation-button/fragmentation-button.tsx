import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'
import { useDimensions } from '@react-native-community/hooks'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'

import { MenuOpenButton } from '../menu-open-button'
import { Menu } from '../menu'
import { MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { getSizes2, harpguruColors } from '../../styles'

import { useToggleFragmentHarpFace } from './hooks'

type FragmentationButtonProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const FragmentationButton = ({
  isLabelHidden,
  stashPosition,
}: FragmentationButtonProps): React.ReactElement => {
  const dimensions = useDimensions()
  const [fragmentHarpFaceByOctaves] = useGlobal('fragmentHarpFaceByOctaves')
  const toggleFragmentHarpFace = useToggleFragmentHarpFace()
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: isLabelHidden,
    stashPosition,
    openCloseMenu: () => toggleFragmentHarpFace(),
  }

  const sizes = getSizes2(dimensions.window)

  const activeLabelIcon =
    fragmentHarpFaceByOctaves === true ? (
      <MaterialIcons
        name="view-column"
        size={sizes['7']}
        color={harpguruColors['gold']}
      />
    ) : (
      <FontAwesome
        name="square"
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
