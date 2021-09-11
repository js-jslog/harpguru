import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuFace } from '../menu-face'
import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import { colors, useSizes } from '../../styles'

import {
  getNewBufferedTogglesByTargetScaleForDispatcher,
  getNewActiveQuizDegreesByToggleForDispatcher,
} from './utils'
import {
  useScaleTitle,
  useScaleItems,
  useQuizQuestionTitle,
  useQuizQuestionItems,
} from './hooks'
import { useImmediatelyFlushToggles } from './hooks'

export const MenuOfScales = (menuProps: MenuProps): React.ReactElement => {
  useImmediatelyFlushToggles({
    isMenuStashed: menuProps.isMenuStashed,
  })
  const scaleItemTapHandler = useCallback(
    useDispatch(getNewBufferedTogglesByTargetScaleForDispatcher),
    [useDispatch, getNewBufferedTogglesByTargetScaleForDispatcher]
  )
  const useScalesTitleMemo = useCallback(() => useScaleTitle(useGlobal), [
    useGlobal,
  ])
  const useScalesItemsMemo = useCallback(
    () => useScaleItems(useGlobal, scaleItemTapHandler),
    [useGlobal, scaleItemTapHandler]
  )

  const useQuizQuestionTitleMemo = useCallback(() => useQuizQuestionTitle(), [])
  const quizQuestionTapHandler = useCallback(
    useDispatch(getNewActiveQuizDegreesByToggleForDispatcher),
    [useDispatch, getNewActiveQuizDegreesByToggleForDispatcher]
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
      useTitle: useQuizQuestionTitleMemo,
      useItems: useQuizQuestionItemsMemo,
      twoColumns: false,
    },
  ]

  const sizes = useSizes()
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
