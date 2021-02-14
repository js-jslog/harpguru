import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'

import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { getSizes, harpguruColors } from '../../styles'

import { useToggleFragmentHarpFace } from './hooks'

type MenuTabFragmentationProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const MenuTabFragmentation = ({
  isLabelHidden,
  stashPosition,
}: MenuTabFragmentationProps): React.ReactElement => {
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
