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

  const useHarpKeyTitleMemo = useCallback(() => useHarpKeyTitle(), [useGlobal])

  const usePozitionTitleMemo = useCallback(() => usePozitionTitle(), [
    useGlobal,
  ])

  const useRootPitchTitleMemo = useCallback(() => useRootPitchTitle(), [
    useGlobal,
  ])

  const useHarpKeyItemsMemo = useCallback(() => useHarpKeyItems(), [useGlobal])

  const usePozitionItemsMemo = useCallback(() => usePozitionItems(), [
    useGlobal,
  ])

  const useRootPitchItemsMemo = useCallback(() => useRootPitchItems(), [
    useGlobal,
  ])

  const useHarpKeyLabelMemo = useCallback(() => useHarpKeyLabel(), [useGlobal])

  const usePozitionLabelMemo = useCallback(() => usePozitionLabel(), [
    useGlobal,
  ])

  const useRootPitchLabelMemo = useCallback(() => useRootPitchLabel(), [
    useGlobal,
  ])

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
