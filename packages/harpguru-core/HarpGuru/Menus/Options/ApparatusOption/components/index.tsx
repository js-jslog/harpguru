import { useGlobal } from 'reactn'
import React from 'react'

import { nudgeHarpStrataByApparatus } from '../nudgeHarpStrataByApparatus'
import { partiallyApplyNudgeFunction } from '../../helpers'
import { OptionContainer } from '../../OptionContainer'

export const ApparatusOption = (): React.ReactElement => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const {
    apparatus: { id: apparatusId },
  } = activeHarpStrata
  const partialParams = {
    activeHarpStrata,
    setActiveHarpStrata,
  }

  const layoutOptionContainerProps = {
    title: 'Layout',
    optionId: apparatusId,
    nudgeFunction: partiallyApplyNudgeFunction(
      nudgeHarpStrataByApparatus,
      partialParams
    ),
  }

  return <OptionContainer {...layoutOptionContainerProps} />
}
