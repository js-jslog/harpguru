import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { Entypo } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import type { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getNewHarpStrataByApparatusForDispatcher } from './utils'
import { useLayoutTitles, useLayoutItems } from './hooks'

export const MenuOfTunings = (menuProps: MenuProps): React.ReactElement => {
  const { useTitle } = useLayoutTitles()
  const { useItems } = useLayoutItems()
  const itemTapHandler = useCallback(
    useDispatch(getNewHarpStrataByApparatusForDispatcher),
    [useDispatch, getNewHarpStrataByApparatusForDispatcher]
  )

  const useTitleMemo = useCallback(() => useTitle(useGlobal), [useGlobal])
  const useItemsMemo = useCallback(() => useItems(useGlobal, itemTapHandler), [
    useGlobal,
    itemTapHandler,
  ])

  const optionStackPropsz = [
    {
      useTitle: useTitleMemo,
      useItems: useItemsMemo,
      twoColumns: false,
    },
  ]

  const sizes = getSizes()
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <MemoOptionStack optionPropsz={optionStackPropsz} />
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <Entypo
          name="cog"
          size={sizes.labelIconSize}
          color={colors.homeRowsColor}
        />
      </MenuOpenButton>
    </Menu>
  )
}
