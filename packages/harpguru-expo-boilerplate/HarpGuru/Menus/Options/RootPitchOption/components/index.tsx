import { useGlobal } from 'reactn'
import React from 'react'

import { nudgeHarpStrataByRootPitch } from '../nudgeHarpStrataByRootPitch'
import { partiallyApplyNudgeFunction } from '../../helpers'
import { OptionContainer } from '../../OptionContainer'

export const RootPitchOption = (): React.ReactElement => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const { rootPitchId } = activeHarpStrata
  const partialParams = {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
  }

  const rootPitchOptionContainerProps = {
    title: 'Position Key',
    optionId: rootPitchId,
    nudgeFunction: partiallyApplyNudgeFunction(
      nudgeHarpStrataByRootPitch,
      partialParams
    ),
  }

  return <OptionContainer {...rootPitchOptionContainerProps} />
}
