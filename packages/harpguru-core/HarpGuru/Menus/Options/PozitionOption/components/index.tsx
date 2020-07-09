import React from 'react'

import type { PozitionOptionProps } from '../types'
import { nudgeHarpStrataByPozition } from '../nudgeHarpStrataByPozition'
import { partiallyApplyNudgeFunction } from '../../helpers'
import { OptionContainer } from '../../OptionContainer'


export const PozitionOption = (props: PozitionOptionProps): React.ReactElement => {
  const { activeHarpStrata, setActiveHarpStrata, activeDisplayMode } = props
  const { pozitionId } = activeHarpStrata
  const partialParams = {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode
  }

  const pozitionOptionContainerProps = {
    title: 'Position',
    optionId: pozitionId,
    nudgeFunction: partiallyApplyNudgeFunction(nudgeHarpStrataByPozition, partialParams),
  }

  return <OptionContainer {...pozitionOptionContainerProps}/>
}
