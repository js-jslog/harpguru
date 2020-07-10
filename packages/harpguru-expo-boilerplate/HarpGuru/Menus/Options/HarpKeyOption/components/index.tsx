import React from 'react'

import type { HarpKeyOptionProps } from '../types'
import { nudgeHarpStrataByHarpKey } from '../nudgeHarpStrataByHarpKey'
import { partiallyApplyNudgeFunction } from '../../helpers'
import { OptionContainer } from '../../OptionContainer'

export const HarpKeyOption = (
  props: HarpKeyOptionProps
): React.ReactElement => {
  const { activeHarpStrata, setActiveHarpStrata, activeDisplayMode } = props
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
