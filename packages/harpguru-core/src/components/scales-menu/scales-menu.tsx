import { useGlobal } from 'reactn'
import React, { useCallback } from 'react'
import type { DegreeIds } from 'harpparts'
import { MaterialIcons } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { useScalesTitles, useScalesItemsz } from './hooks'
import { useDispatchAndFlushScaleToggles } from './hooks'

export const ScalesMenu = (menuProps: MenuProps): React.ReactElement => {
  const { useScalesTitle, useChordsTitle } = useScalesTitles()
  const { useScalesItems, useChordsItems } = useScalesItemsz()
  const dispatchAndFlushScaleToggles = useDispatchAndFlushScaleToggles({
    isMenuStashed: menuProps.isMenuStashed,
  })
  const itemTapHandler = useCallback(
    (arg0: ReadonlyArray<DegreeIds>) => dispatchAndFlushScaleToggles(arg0),
    [dispatchAndFlushScaleToggles]
  )

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
