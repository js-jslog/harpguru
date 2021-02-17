import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { Entypo } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuFace } from '../menu-face'
import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import type { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getNewHarpStrataByApparatusForDispatcher } from './utils'
import {
  useLayoutTitles,
  useLayoutItems,
  useQuizQuestionTitle,
  useQuizQuestionItems,
} from './hooks'

export const MenuOfTunings = (menuProps: MenuProps): React.ReactElement => {
  const { useTuningTitle } = useLayoutTitles()
  const { useTuningItems } = useLayoutItems()
  const itemTapHandler = useCallback(
    useDispatch(getNewHarpStrataByApparatusForDispatcher),
    [useDispatch, getNewHarpStrataByApparatusForDispatcher]
  )

  const useTuningTitleMemo = useCallback(() => useTuningTitle(useGlobal), [
    useGlobal,
  ])
  const useTuningItemsMemo = useCallback(
    () => useTuningItems(useGlobal, itemTapHandler),
    [useGlobal, itemTapHandler]
  )

  const useQuizQuestionTitleMemo = useCallback(() => useQuizQuestionTitle(), [])
  const quizQuestionTapHandler = useCallback(
    useDispatch(() => ({ activeQuizDegrees: [] })),
    [useDispatch]
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
