import { useWindowDimensions } from 'use-dimensions'
import { Text, View } from 'react-native'
import React from 'react'

import { MenuOpenButton } from '../menu-open-button'
import { Menu } from '../menu'
import { MenuStashPosition, PageNumber } from '../../types'
import type { MenuProps } from '../../types'
import { getSizes, harpguruColors } from '../../styles'

type NextPageButtonProps = {
  readonly thisPage: PageNumber
  readonly totalPages: PageNumber
  readonly stashPosition: MenuStashPosition
  readonly getNextPage: () => void
}

export const NextPageButton = ({
  thisPage,
  totalPages,
  stashPosition,
  getNextPage,
}: NextPageButtonProps): React.ReactElement => {
  useWindowDimensions()
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
              fontWeight: 'bold',
              color: harpguruColors.pink,
            }}
          >
            {thisPage}
          </Text>
          <Text
            style={{
              fontSize: sizes['6'],
              fontWeight: 'normal',
              color: harpguruColors.pink,
            }}
          >
            / {totalPages}
          </Text>
        </View>
      </MenuOpenButton>
    </Menu>
  )
}
