import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { Entypo } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuFace } from '../menu-face'
import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import type { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import {
  getNewHarpStrataByTuningForDispatcher,
  getNewHarpStrataByValvingForDispatcher,
  getToggledActiveQuizDegrees,
} from './utils'
import {
  useQuizQuestionTitle,
  useQuizQuestionItems,
  useTuningTitle,
  useTuningItems,
  useValvingTitle,
  useValvingItems,
} from './hooks'

export const MenuOfSettings = (menuProps: MenuProps): React.ReactElement => {
  const useTuningTitleMemo = useCallback(() => useTuningTitle(useGlobal), [
    useGlobal,
  ])
  const tuningItemTapHandler = useCallback(
    useDispatch(getNewHarpStrataByTuningForDispatcher),
    [useDispatch, getNewHarpStrataByTuningForDispatcher]
  )
  const useTuningItemsMemo = useCallback(
    () => useTuningItems(useGlobal, tuningItemTapHandler),
    [useGlobal, tuningItemTapHandler]
  )

  const useValvingTitleMemo = useCallback(() => useValvingTitle(useGlobal), [
    useGlobal,
  ])
  const valvingItemTapHandler = useCallback(
    useDispatch(getNewHarpStrataByValvingForDispatcher),
    [useDispatch, getNewHarpStrataByValvingForDispatcher]
  )
  const useValvingItemsMemo = useCallback(
    () => useValvingItems(useGlobal, valvingItemTapHandler),
    [useGlobal, valvingItemTapHandler]
  )

  const useQuizQuestionTitleMemo = useCallback(() => useQuizQuestionTitle(), [])
  const quizQuestionTapHandler = useCallback(
    useDispatch(getToggledActiveQuizDegrees),
    [useDispatch, getToggledActiveQuizDegrees]
  )
  const useQuizQuestionItemsMemo = useCallback(
    () => useQuizQuestionItems(useGlobal, quizQuestionTapHandler),
    [useGlobal, quizQuestionTapHandler]
  )

  const optionStackPropsz = [
    {
      useTitle: useTuningTitleMemo,
      useItems: useTuningItemsMemo,
      twoColumns: false,
    },
    {
      useTitle: useValvingTitleMemo,
      useItems: useValvingItemsMemo,
      twoColumns: false,
    },
    {
      useTitle: useQuizQuestionTitleMemo,
      useItems: useQuizQuestionItemsMemo,
      twoColumns: false,
    },
  ]

  const sizes = getSizes()
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <MemoOptionStack optionPropsz={optionStackPropsz} />
      </MenuFace>
      <MenuAccessOpen {...menuProps}>
        <Entypo
          name="cog"
          size={sizes.labelIconSize}
          color={colors.homeRowsColor}
        />
      </MenuAccessOpen>
    </Menu>
  )
}
