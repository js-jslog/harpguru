import { Text, View } from 'react-native'
import React from 'react'

import { MenuOpenButton } from '../menu-open-button'
import { Menu } from '../menu'
import { MenuStashPosition, PageNumber } from '../../types'
import type { MenuProps } from '../../types'
import { harpguruColors } from '../../styles'
import { useSizes } from '../../hooks'

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
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: false,
    stashPosition,
    openCloseMenu: getNextPage,
  }

  const sizes = useSizes()
  console.log('::::::::::::::::::::::::::::: NextPageButton: ' + sizes['10'])

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
