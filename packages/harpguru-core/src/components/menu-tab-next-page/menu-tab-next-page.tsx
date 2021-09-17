import { Text, View } from 'react-native'
import React from 'react'

import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { MenuStashPosition, PageNumber } from '../../types'
import type { MenuProps } from '../../types'
import { harpguruColors } from '../../styles'
import { useSizes } from '../../hooks'

type MenuTabNextPageProps = {
  readonly thisPage: PageNumber
  readonly totalPages: PageNumber
  readonly stashPosition: MenuStashPosition
  readonly getNextPage: () => void
}

export const MenuTabNextPage = ({
  thisPage,
  totalPages,
  stashPosition,
  getNextPage,
}: MenuTabNextPageProps): React.ReactElement => {
  const menuLikeProps: MenuProps = {
    isMenuStashed: true,
    isLabelHidden: false,
    stashPosition,
    openCloseMenu: getNextPage,
  }

  const { dynamicSizes } = useSizes()

  return (
    <Menu {...menuLikeProps}>
      <MenuAccessOpen {...menuLikeProps}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              fontSize: dynamicSizes['7'],
              fontWeight: 'bold',
              color: harpguruColors.pink,
            }}
          >
            {thisPage}
          </Text>
          <Text
            style={{
              fontSize: dynamicSizes['6'],
              fontWeight: 'normal',
              color: harpguruColors.pink,
            }}
          >
            / {totalPages}
          </Text>
        </View>
      </MenuAccessOpen>
    </Menu>
  )
}
