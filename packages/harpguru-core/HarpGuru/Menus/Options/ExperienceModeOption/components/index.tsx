import { useGlobal } from 'reactn'
import React from 'react'

import { nudgeExperienceMode } from '../nudgeExperienceMode'
import { partiallyApplyNudgeFunction } from '../../helpers'
import { OptionContainer } from '../../OptionContainer'

export const ExperienceModeOption = (): React.ReactElement => {
  const [activeExperienceMode, setActiveExperienceMode] = useGlobal(
    'activeExperienceMode'
  )
  const partialParams = {
    activeExperienceMode,
    setActiveExperienceMode,
  }
  const experienceModeOptionProps = {
    title: 'Experience',
    optionId: activeExperienceMode,
    nudgeFunction: partiallyApplyNudgeFunction(
      nudgeExperienceMode,
      partialParams
    ),
  }

  return <OptionContainer {...experienceModeOptionProps} />
}
