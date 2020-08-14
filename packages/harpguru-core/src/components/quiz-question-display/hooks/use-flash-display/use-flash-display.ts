import { useGlobal } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import { Easing, Node } from 'react-native-reanimated'
import { useEffect, useState } from 'react'

import { ExperienceModes } from '../../../../types'

export const useFlashDisplay = (screenFree: boolean): Node<number> => {
  const [displayPeriod, setDisplayPeriod] = useState<boolean>(true)
  const [quizQuestion] = useGlobal('quizQuestion')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')

  useEffect(() => {
    setDisplayPeriod(true)
    const hideQuestionTimer = setTimeout(() => {
      setDisplayPeriod(false)
    }, 1000)
    return () => {
      clearTimeout(hideQuestionTimer)
    }
  }, [quizQuestion])

  const shouldDisplay =
    screenFree && displayPeriod && activeExperienceMode === ExperienceModes.Quiz

  const flashAnimationValue = useTimingTransition(shouldDisplay, {
    duration: 200,
    easing: Easing.inOut(Easing.ease),
  })

  return flashAnimationValue
}
