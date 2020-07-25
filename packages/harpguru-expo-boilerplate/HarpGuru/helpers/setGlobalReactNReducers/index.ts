import type { State } from 'reactn/default'
import { addReducer } from 'reactn'
import { getHarpStrata } from 'harpstrata'

import { getPropsForHarpStrata } from '../getPropsForHarpStrata'
import { getNextQuizQuestion } from '../getNextQuizQuestion'
import { activateHarpCell } from '../activateHarpCell'
import { DisplayModes } from '../../types'

export const setGlobalReactNReducers = (): void => {
  addReducer('requestNextQuestion', (global: State) => {
    const { activeHarpStrata, quizQuestion, activeDisplayMode } = global
    const nextQuizQuestion = getNextQuizQuestion(
      quizQuestion,
      activeDisplayMode
    )
    const harpStrataProps = getPropsForHarpStrata(
      activeHarpStrata,
      DisplayModes.Degree
    )
    const resetActiveHarpStrata = getHarpStrata({
      ...harpStrataProps,
      activeIds: [],
    })
    return {
      activeHarpStrata: resetActiveHarpStrata,
      quizQuestion: nextQuizQuestion,
    }
  })

  addReducer('revealAnswer', (global: State) => {
    const { activeHarpStrata, quizQuestion } = global
    const props = {
      harpStrata: activeHarpStrata,
      cellId: quizQuestion,
    }
    return {
      activeHarpStrata: activateHarpCell(props),
    }
  })
}
