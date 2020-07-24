import { useGlobal } from 'reactn'
import React from 'react'

import { nudgeDisplayMode } from '../nudgeDisplayMode'
import { partiallyApplyNudgeFunction } from '../../helpers'
import { OptionContainer } from '../../OptionContainer'

export const DisplayModeOption = (): React.ReactElement => {
  const [activeDisplayMode, setActiveDisplayMode] = useGlobal(
    'activeDisplayMode'
  )
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
