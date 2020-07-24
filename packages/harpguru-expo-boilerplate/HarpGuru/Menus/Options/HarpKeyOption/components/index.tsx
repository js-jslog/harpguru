import { useGlobal } from 'reactn'
import React from 'react'

import { nudgeHarpStrataByHarpKey } from '../nudgeHarpStrataByHarpKey'
import { partiallyApplyNudgeFunction } from '../../helpers'
import { OptionContainer } from '../../OptionContainer'

export const HarpKeyOption = (): React.ReactElement => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const { harpKeyId } = activeHarpStrata
  const partialParams = {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
  }

  const harpKeyOptionContainerProps = {
    title: 'Harp Key',
    optionId: harpKeyId,
    nudgeFunction: partiallyApplyNudgeFunction(
      nudgeHarpStrataByHarpKey,
      partialParams
    ),
  }

  return <OptionContainer {...harpKeyOptionContainerProps} />
}
