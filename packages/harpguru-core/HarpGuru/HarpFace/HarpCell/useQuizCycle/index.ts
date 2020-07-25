import { useGlobal, useDispatch } from 'reactn'
import { useEffect } from 'react'
import { IsActiveIds } from 'harpstrata'

import { usePositionAnalysis } from '../usePositionAnalysis'
import { YXCoord } from '../types'
import { ExperienceModes } from '../../../helpers/setGlobalReactNState'
import { usePrevious } from '../../../helpers'

export const useQuizCycle = (yxCoord: YXCoord): void => {
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const [quizQuestion] = useGlobal('quizQuestion')
  const { thisIsActiveId } = usePositionAnalysis(yxCoord)
  const previousIsActiveId = usePrevious(thisIsActiveId, IsActiveIds.Inactive)

  const requestNextQuestion = useDispatch('requestNextQuestion')
  const revealAnswer = useDispatch('revealAnswer')
  useEffect(() => {
    if (
      thisIsActiveId === IsActiveIds.Active &&
      previousIsActiveId === IsActiveIds.Inactive &&
      activeExperienceMode === ExperienceModes.Quiz
    ) {
      const revealTimer = setTimeout(() => {
        revealAnswer()
      }, 200)
      const nextQuestionTimer = setTimeout(() => {
        requestNextQuestion()
      }, 1500)
      return () => {
        clearTimeout(revealTimer)
        clearTimeout(nextQuestionTimer)
      }
    }
    return undefined
  }, [quizQuestion, thisIsActiveId])
}
