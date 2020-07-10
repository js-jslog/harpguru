import React from 'react'

import type { DisplayModeOptionProps } from '../types'
import { nudgeDisplayMode } from '../nudgeDisplayMode'
import { partiallyApplyNudgeFunction } from '../../helpers'
import { OptionContainer } from '../../OptionContainer'

export const DisplayModeOption = (
  props: DisplayModeOptionProps
): React.ReactElement => {
  const { activeDisplayMode, setActiveDisplayMode } = props
  const partialParams = {
    activeDisplayMode,
    setActiveDisplayMode,
  }

  const displayModeOptionContainerProps = {
    title: 'Display',
    optionId: activeDisplayMode,
    nudgeFunction: partiallyApplyNudgeFunction(nudgeDisplayMode, partialParams),
  }

  return <OptionContainer {...displayModeOptionContainerProps} />
}
