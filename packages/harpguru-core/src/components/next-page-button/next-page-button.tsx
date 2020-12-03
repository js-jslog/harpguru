import { Text, View } from 'react-native'
import React from 'react'

import { MenuOpenButton } from '../menu-open-button'
import { Menu } from '../menu'
import { MenuStashPosition } from '../../types'
import type { MenuProps } from '../../types'
import { getSizes, colors } from '../../styles'

type NextPageButtonProps = {
  readonly thisPage: number
  readonly totalPages: number
  readonly stashPosition: MenuStashPosition
  readonly getNextPage: () => void
}

export const NextPageButton = ({
  thisPage,
  totalPages,
  stashPosition,
  getNextPage,
}: NextPageButtonProps): React.ReactElement => {
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: false,
    stashPosition,
    openCloseMenu: getNextPage,
  }

  const sizes = getSizes()

  return (
    <Menu {...menuLikeProps}>
      <MenuOpenButton {...menuLikeProps}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              fontSize: sizes['7'],
              color: colors.inertOutline,
            }}
          >
            {thisPage}
          </Text>
          <Text
            style={{
              fontSize: sizes['6'],
              color: colors.inertOutline,
            }}
          >
            of {totalPages}
          </Text>
        </View>
      </MenuOpenButton>
    </Menu>
  )
}
