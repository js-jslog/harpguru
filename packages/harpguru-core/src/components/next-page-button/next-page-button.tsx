import { useGlobal } from 'reactn'
import { Text, View } from 'react-native'
import React from 'react'

import { MenuOpenButton } from '../menu-open-button'
import { Menu } from '../menu'
import { MenuStashPosition, PageNumber } from '../../types'
import type { MenuProps } from '../../types'
import { getSizes, colors } from '../../styles'

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
  // This line only exists to make sure that this tab rerenders
  // when the harpstrata changes just like the other menu tabs
  // if it doesn't then it's possible that the tabs' protrusions
  // will become unequal after the screen is resized.
  // This is really a hacky workaround, but it's cheap and effective.
  // eslint-disable-next-line no-empty-pattern
  const [] = useGlobal('activeHarpStrata')
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
