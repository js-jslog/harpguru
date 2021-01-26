import { useGlobal } from 'reactn'
import React, { useCallback } from 'react'
import { Feather } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import type { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import {
  useCovariantTitles,
  useCovariantItems,
  useCovariantLabels,
} from './hooks'

export const CovariantMenu = (menuProps: MenuProps): React.ReactElement => {
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

  const useHarpKeyItemsMemo = useCallback(() => useHarpKeyItems(useGlobal), [
    useGlobal,
  ])

  const usePozitionItemsMemo = useCallback(() => usePozitionItems(useGlobal), [
    useGlobal,
  ])

  const useRootPitchItemsMemo = useCallback(
    () => useRootPitchItems(useGlobal),
    [useGlobal]
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
      <MenuOpenButton {...menuProps}>
        <Feather
          name="sliders"
          size={sizes.labelIconSize}
          color={colors.homeRowsColor}
        />
      </MenuOpenButton>
    </Menu>
  )
}
