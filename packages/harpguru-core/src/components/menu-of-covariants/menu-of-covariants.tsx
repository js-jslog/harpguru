import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { Feather } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuFace } from '../menu-face'
import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import type { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getNewHarpStrataForDispatcher } from './utils'
import {
  useCovariantTitles,
  useCovariantItems,
  useCovariantLabels,
} from './hooks'

export const MenuOfCovariants = (menuProps: MenuProps): React.ReactElement => {
  const itemTapHandler = useCallback(
    useDispatch(getNewHarpStrataForDispatcher),
    [useDispatch, getNewHarpStrataForDispatcher]
  )
  const {
    useHarpKeyTitle,
    usePozitionTitle,
    useRootPitchTitle,
  } = useCovariantTitles()
  const {
    useHarpKeyItems,
    usePozitionItems,
    useRootPitchItems,
  } = useCovariantItems()
  const {
    useHarpKeyLabel,
    usePozitionLabel,
    useRootPitchLabel,
  } = useCovariantLabels()

  const useHarpKeyTitleMemo = useCallback(() => useHarpKeyTitle(useGlobal), [
    useGlobal,
  ])

  const usePozitionTitleMemo = useCallback(() => usePozitionTitle(useGlobal), [
    useGlobal,
  ])

  const useRootPitchTitleMemo = useCallback(
    () => useRootPitchTitle(useGlobal),
    [useGlobal]
  )

  const useHarpKeyItemsMemo = useCallback(
    () => useHarpKeyItems(useGlobal, itemTapHandler),
    [useGlobal, itemTapHandler]
  )

  const usePozitionItemsMemo = useCallback(
    () => usePozitionItems(useGlobal, itemTapHandler),
    [useGlobal, itemTapHandler]
  )

  const useRootPitchItemsMemo = useCallback(
    () => useRootPitchItems(useGlobal, itemTapHandler),
    [useGlobal, itemTapHandler]
  )

  const useHarpKeyLabelMemo = useCallback(() => useHarpKeyLabel(useGlobal), [
    useGlobal,
  ])

  const usePozitionLabelMemo = useCallback(() => usePozitionLabel(useGlobal), [
    useGlobal,
  ])

  const useRootPitchLabelMemo = useCallback(
    () => useRootPitchLabel(useGlobal),
    [useGlobal]
  )

  const sizes = getSizes()

  const optionPropsz = [
    {
      useTitle: useHarpKeyTitleMemo,
      useItems: useHarpKeyItemsMemo,
      twoColumns: true,
      useLeftColumnLabel: usePozitionLabelMemo,
      useRightColumnLabel: useRootPitchLabelMemo,
    },
    {
      useTitle: usePozitionTitleMemo,
      useItems: usePozitionItemsMemo,
      twoColumns: true,
      useLeftColumnLabel: useRootPitchLabelMemo,
      useRightColumnLabel: useHarpKeyLabelMemo,
    },
    {
      useTitle: useRootPitchTitleMemo,
      useItems: useRootPitchItemsMemo,
      twoColumns: true,
      useLeftColumnLabel: useHarpKeyLabelMemo,
      useRightColumnLabel: usePozitionLabelMemo,
    },
  ]
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <MemoOptionStack optionPropsz={optionPropsz} />
      </MenuFace>
      <MenuAccessOpen {...menuProps}>
        <Feather
          name="sliders"
          size={sizes.labelIconSize}
          color={colors.homeRowsColor}
        />
      </MenuAccessOpen>
    </Menu>
  )
}
