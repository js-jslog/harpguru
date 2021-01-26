import { useGlobal } from 'reactn'
import React from 'react'
import { getPitch, getPozition } from 'harpparts'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'

type CovariantMenuTitles = {
  readonly useHarpKeyTitle: () => React.ReactElement<OptionLabelProps>
  readonly usePozitionTitle: () => React.ReactElement<OptionLabelProps>
  readonly useRootPitchTitle: () => React.ReactElement<OptionLabelProps>
}

export const useCovariantTitles = (): CovariantMenuTitles => {
  const useHarpKeyTitle = () => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { harpKeyId } = activeHarpStrata
    return (
      <OptionLabel
        name={'Harp key'}
        isLargeTitle={true}
        value={getPitch(harpKeyId)}
        alignItems={'center'}
      />
    )
  }

  const usePozitionTitle = () => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { pozitionId } = activeHarpStrata
    return (
      <OptionLabel
        name={'Position'}
        isLargeTitle={true}
        value={getPozition(pozitionId)}
        alignItems={'center'}
      />
    )
  }

  const useRootPitchTitle = () => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { rootPitchId } = activeHarpStrata
    return (
      <OptionLabel
        name={'Song key'}
        isLargeTitle={true}
        value={getPitch(rootPitchId)}
        alignItems={'center'}
      />
    )
  }

  return {
    useHarpKeyTitle,
    usePozitionTitle,
    useRootPitchTitle,
  }
}
