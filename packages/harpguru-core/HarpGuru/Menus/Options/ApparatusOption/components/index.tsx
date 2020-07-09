import React from 'react'

import type { ApparatusOptionProps } from '../types'
import { nudgeHarpStrataByApparatus } from '../nudgeHarpStrataByApparatus'
import { partiallyApplyNudgeFunction } from '../../helpers'
import { OptionContainer } from '../../OptionContainer'


export const ApparatusOption = (props: ApparatusOptionProps): React.ReactElement => {
  const { activeHarpStrata, setActiveHarpStrata } = props
  const { apparatus: {id: apparatusId} } = activeHarpStrata
  const partialParams = {
    activeHarpStrata,
    setActiveHarpStrata
  }

  const layoutOptionContainerProps = {
    title: 'Layout',
    optionId: apparatusId,
    nudgeFunction: partiallyApplyNudgeFunction(nudgeHarpStrataByApparatus, partialParams),
  }

  return <OptionContainer {...layoutOptionContainerProps}/>
}
