import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuFace } from '../menu-face'
import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getTogglesForDispatcher, getToggledActiveQuizDegrees } from './utils'
import {
  useScalesTitles,
  useScalesItemsz,
  useQuizQuestionTitle,
  useQuizQuestionItems,
} from './hooks'
import { useImmediatelyFlushToggles } from './hooks'

export const MenuOfScales = (menuProps: MenuProps): React.ReactElement => {
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
      useTitle: useScalesTitleMemo,
      useItems: useScalesItemsMemo,
      twoColumns: false,
    },
    {
      useTitle: useChordsTitleMemo,
      useItems: useChordsItemsMemo,
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
        <MaterialIcons
          name="linear-scale"
          size={sizes.labelIconSize}
          color={colors.homeRowsColor}
        />
      </MenuAccessOpen>
    </Menu>
  )
}
