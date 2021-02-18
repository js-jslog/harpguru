import { useGlobal } from 'reactn'
import React from 'react'

import { RenderedTone } from '../rendered-tone'
import { NotificationFlash } from '../notification-flash'
import { getRenderableToneTuples } from '../../utils'
import type { RenderableToneTuples } from '../../types'
import { getSizes } from '../../styles'

import { useQuizQuestionCycle } from './hooks'

type NotifyOfQuizQuestionProps = {
  readonly isScreenFree: boolean
}

export const NotifyOfQuizQuestion = ({
  isScreenFree,
}: NotifyOfQuizQuestionProps): React.ReactElement => {
  const [quizQuestion, shouldDisplay] = useQuizQuestionCycle(isScreenFree)
  const [activeExperienceMode] = useGlobal('activeExperienceMode')

  const toneTuples = getRenderableToneTuples(quizQuestion)

  const selectToneVersionForDisplay = (
    toneTuples: RenderableToneTuples
  ): RenderableToneTuples => {
    if (toneTuples.length === 1) return toneTuples

    const random = Math.floor(Math.random() * 2)

    if (random === 0) return [toneTuples[0]]
    return [toneTuples[1]]
  }

  const sizes = getSizes()

  return (
    <NotificationFlash
      shouldDisplay={shouldDisplay}
      messageScaleMultiplier={sizes['3']}
    >
      <RenderedTone
        toneTuples={selectToneVersionForDisplay(toneTuples)}
        isActive={false}
        isQuestion={true}
        splitType={'FLAT'}
        activeExperienceMode={activeExperienceMode}
      />
    </NotificationFlash>
  )
}