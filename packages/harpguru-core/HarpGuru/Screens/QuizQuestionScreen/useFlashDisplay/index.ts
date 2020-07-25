import { useGlobal } from 'reactn'
import { useEffect, useState } from 'react'

import { ExperienceModes } from '../../../helpers/setGlobalReactNState'

export const useFlashDisplay = (screenFree: boolean): boolean => {
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

  return (
    screenFree && displayPeriod && activeExperienceMode === ExperienceModes.Quiz
  )
}
