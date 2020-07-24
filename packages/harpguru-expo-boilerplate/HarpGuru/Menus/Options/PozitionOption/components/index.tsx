import { useGlobal } from 'reactn'
import React from 'react'

import { nudgeHarpStrataByPozition } from '../nudgeHarpStrataByPozition'
import { partiallyApplyNudgeFunction } from '../../helpers'
import { OptionContainer } from '../../OptionContainer'

export const PozitionOption = (): React.ReactElement => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const { pozitionId } = activeHarpStrata
  const partialParams = {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
  }

  const pozitionOptionContainerProps = {
    title: 'Position',
    optionId: pozitionId,
    nudgeFunction: partiallyApplyNudgeFunction(
      nudgeHarpStrataByPozition,
      partialParams
    ),
  }

  return <OptionContainer {...pozitionOptionContainerProps} />
}
