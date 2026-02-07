import React, { useCallback } from 'react'
import type { HarpStrataProps } from 'harpstrata'
import { Feather } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuFace } from '../menu-face'
import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { getColors } from '../../utils'
import type { MenuProps, DisplayModes } from '../../types'
import { useHarpGuruStore, useHarpGuruStoreInstance } from '../../store'

import { reduceCovariantsToHarpStrata } from './utils'
import {
  useCovariantTitles,
  useCovariantItems,
  useCovariantLabels,
} from './hooks'

export const MenuOfCovariants = (menuProps: MenuProps): React.ReactElement => {
  const store = useHarpGuruStoreInstance()
  const itemTapHandler = useCallback(
    (activeDisplayMode: DisplayModes, partialHarpStrata: Pick<HarpStrataProps, 'harpKeyId' | 'pozitionId'>) => {
      store.setState((state) => ({
        activeHarpStrata: reduceCovariantsToHarpStrata(
          state.activeHarpStrata,
          activeDisplayMode,
          partialHarpStrata
        ),
      }))
    },
    [store]
  )
  const { useHarpKeyTitle, usePozitionTitle, useRootPitchTitle } =
    useCovariantTitles()
  const { useHarpKeyItems, usePozitionItems, useRootPitchItems } =
    useCovariantItems()
  const { useHarpKeyLabel, usePozitionLabel, useRootPitchLabel } =
    useCovariantLabels()

  const useHarpKeyTitleMemo = useCallback(() => useHarpKeyTitle(), [])

  const usePozitionTitleMemo = useCallback(() => usePozitionTitle(), [])

  const useRootPitchTitleMemo = useCallback(() => useRootPitchTitle(), [])

  const useHarpKeyItemsMemo = useCallback(
    () => useHarpKeyItems(itemTapHandler),
    [itemTapHandler]
  )

  const usePozitionItemsMemo = useCallback(
    () => usePozitionItems(itemTapHandler),
    [itemTapHandler]
  )

  const useRootPitchItemsMemo = useCallback(
    () => useRootPitchItems(itemTapHandler),
    [itemTapHandler]
  )

  const useHarpKeyLabelMemo = useCallback(() => useHarpKeyLabel(), [])

  const usePozitionLabelMemo = useCallback(() => usePozitionLabel(), [])

  const useRootPitchLabelMemo = useCallback(() => useRootPitchLabel(), [])

  const dynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)

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
          size={dynamicSizes.labelIconSize}
          color={getColors().homeRowsColor}
        />
      </MenuAccessOpen>
    </Menu>
  )
}
