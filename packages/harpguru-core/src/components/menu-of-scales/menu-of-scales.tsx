import React, { useCallback } from 'react'
import type { DegreeIds } from 'harpparts'
import { MaterialIcons } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuFace } from '../menu-face'
import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { getColors } from '../../utils'
import { MenuProps } from '../../types'
import { useHarpGuruStore, useHarpGuruStoreInstance } from '../../store'

import {
  reduceToggleToQuizableDegreeIds,
  reduceScaleToHarpStrata,
} from './utils'
import {
  useScaleTitle,
  useScaleItems,
  useQuizQuestionTitle,
  useQuizQuestionItems,
} from './hooks'

export const MenuOfScales = (menuProps: MenuProps): React.ReactElement => {
  const store = useHarpGuruStoreInstance()
  const scaleItemTapHandler = useCallback(
    (targetScale: ReadonlyArray<DegreeIds>) => {
      store.setState((state) => ({
        activeHarpStrata: reduceScaleToHarpStrata(
          state.activeHarpStrata,
          targetScale
        ),
      }))
    },
    [store]
  )
  const useScalesTitleMemo = useCallback(() => useScaleTitle(), [])
  const useScalesItemsMemo = useCallback(
    () => useScaleItems(scaleItemTapHandler),
    [scaleItemTapHandler]
  )

  const useQuizQuestionTitleMemo = useCallback(() => useQuizQuestionTitle(), [])
  const quizQuestionTapHandler = useCallback(
    (degreeId: DegreeIds) => {
      store.setState((state) => ({
        activeQuizDegrees: reduceToggleToQuizableDegreeIds(
          state.activeQuizDegrees,
          degreeId
        ),
      }))
    },
    [store]
  )
  const useQuizQuestionItemsMemo = useCallback(
    () => useQuizQuestionItems(quizQuestionTapHandler),
    [quizQuestionTapHandler]
  )

  const optionStackPropsz = [
    {
      useTitle: useScalesTitleMemo,
      useItems: useScalesItemsMemo,
      twoColumns: false,
    },
    {
      useTitle: useQuizQuestionTitleMemo,
      useItems: useQuizQuestionItemsMemo,
      twoColumns: false,
    },
  ]

  const dynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <MemoOptionStack optionPropsz={optionStackPropsz} />
      </MenuFace>
      <MenuAccessOpen {...menuProps}>
        <MaterialIcons
          name="linear-scale"
          size={dynamicSizes.labelIconSize}
          color={getColors().homeRowsColor}
        />
      </MenuAccessOpen>
    </Menu>
  )
}
