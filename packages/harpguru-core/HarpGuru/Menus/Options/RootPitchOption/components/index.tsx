import React from 'react'

import type { RootPitchOptionProps } from '../types'
import { nudgeHarpStrataByRootPitch } from '../nudgeHarpStrataByRootPitch'
import { partiallyApplyNudgeFunction } from '../../helpers'
import { OptionContainer } from '../../OptionContainer'


export const RootPitchOption = (props: RootPitchOptionProps): React.ReactElement => {
  const { activeHarpStrata, setActiveHarpStrata, activeDisplayMode } = props
  const { rootPitchId } = activeHarpStrata
  const partialParams = {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode
  }

  const rootPitchOptionContainerProps = {
    title: 'Position Key',
    optionId: rootPitchId,
    nudgeFunction: partiallyApplyNudgeFunction(nudgeHarpStrataByRootPitch, partialParams),
  }

  return <OptionContainer {...rootPitchOptionContainerProps}/>
}
