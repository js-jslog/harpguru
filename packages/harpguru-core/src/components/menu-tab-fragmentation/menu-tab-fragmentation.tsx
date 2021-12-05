import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'

import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { getColors } from '../../utils'
import { MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'

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

  const [dynamicSizes] = useGlobal('dynamicSizes')
  const { harpguruGold } = getColors()

  const activeLabelIcon =
    fragmentHarpFaceByOctaves === true ? (
      <MaterialIcons
        name="view-column"
        size={dynamicSizes.labelIconSize}
        color={harpguruGold}
      />
    ) : (
      <FontAwesome
        name="square"
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
