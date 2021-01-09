import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'

import { MenuOpenButton } from '../menu-open-button'
import { Menu } from '../menu'
import { MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { harpguruColors } from '../../styles'
import { useSizes } from '../../hooks'

import { useToggleFragmentHarpFace } from './hooks'

type FragmentationButtonProps = {
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
}

export const FragmentationButton = ({
  isLabelHidden,
  stashPosition,
}: FragmentationButtonProps): React.ReactElement => {
  const [fragmentHarpFaceByOctaves] = useGlobal('fragmentHarpFaceByOctaves')
  const toggleFragmentHarpFace = useToggleFragmentHarpFace()
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: isLabelHidden,
    stashPosition,
    openCloseMenu: () => toggleFragmentHarpFace(),
  }

  const sizes = useSizes()
  console.log(
    '::::::::::::::::::::::::::::: FragmentationButton: ' + sizes['10']
  )

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
