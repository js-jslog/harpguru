import { Text, View } from 'react-native'
import React from 'react'

import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { getColors } from '../../utils'
import { MenuStashPosition, PageNumber } from '../../types'
import type { MenuProps } from '../../types'
import { useHarpGuruStore } from '../../store'

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

  const dynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)
  const { harpguruPink } = getColors()

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
              color: harpguruPink,
            }}
          >
            {thisPage}
          </Text>
          <Text
            style={{
              fontSize: dynamicSizes['6'],
              fontWeight: 'normal',
              color: harpguruPink,
            }}
          >
            / {totalPages}
          </Text>
        </View>
      </MenuAccessOpen>
    </Menu>
  )
}
