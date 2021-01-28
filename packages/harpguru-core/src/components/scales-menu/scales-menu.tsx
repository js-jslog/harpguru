import { useWindowDimensions } from 'use-dimensions'
import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getTogglesForDispatcher } from './utils'
import { useScalesTitles, useScalesItemsz } from './hooks'
import { useImmediatelyFlushToggles } from './hooks'

export const ScalesMenu = (menuProps: MenuProps): React.ReactElement => {
  useWindowDimensions()
  const { useScalesTitle, useChordsTitle } = useScalesTitles()
  const { useScalesItems, useChordsItems } = useScalesItemsz()
  useImmediatelyFlushToggles({
    isMenuStashed: menuProps.isMenuStashed,
  })
  const itemTapHandler = useCallback(useDispatch(getTogglesForDispatcher), [
    useDispatch,
    getTogglesForDispatcher,
  ])

  const useScalesTitleMemo = useCallback(() => useScalesTitle(useGlobal), [
    useGlobal,
  ])
  const useChordsTitleMemo = useCallback(() => useChordsTitle(useGlobal), [
    useGlobal,
  ])

  const useScalesItemsMemo = useCallback(
    () => useScalesItems(useGlobal, itemTapHandler),
    [useGlobal, itemTapHandler]
  )
  const useChordsItemsMemo = useCallback(
    () => useChordsItems(useGlobal, itemTapHandler),
    [useGlobal, itemTapHandler]
  )

  const optionStackPropsz = [
    {
      useTitle: useScalesTitleMemo,
      useItems: useScalesItemsMemo,
      twoColumns: false,
    },
    {
      useTitle: useChordsTitleMemo,
      useItems: useChordsItemsMemo,
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
        <MaterialIcons
          name="linear-scale"
          size={sizes.labelIconSize}
          color={colors.homeRowsColor}
        />
      </MenuOpenButton>
    </Menu>
  )
}
