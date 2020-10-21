import type { State } from 'reactn/default'
import { addReducer } from 'reactn'
import { getHarpStrata } from 'harpstrata'
import type { HarpStrata } from 'harpstrata'

import { getPropsForHarpStrata } from '../get-props-for-harp-strata'
import { getNextQuizQuestion } from '../get-next-quiz-question'
import { DisplayModes } from '../../types'

import { activateHarpCell } from './utils'

export const setGlobalReducers = (): void => {
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
    return {
      activeHarpStrata: activateHarpCell(activeHarpStrata, quizQuestion),
    }
  })

  addReducer('setActiveHarpStrata', (newHarpStrata: HarpStrata) => {
    const { isActiveComplex: { activeDegreeIds }} = newHarpStrata
    return {
      activeHarpStrata: newHarpStrata,
      activeDegreeIdBuffer: activeDegreeIds
    }
  })
}
