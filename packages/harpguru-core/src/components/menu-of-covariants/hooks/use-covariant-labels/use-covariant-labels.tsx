import React from 'react'
import { getPitch, getPozition } from 'harpparts'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import { useHarpGuruStore } from '../../../../store'

type CovariantMenuLabels = {
  readonly useHarpKeyLabel: () => React.ReactElement<OptionLabelProps>
  readonly usePozitionLabel: () => React.ReactElement<OptionLabelProps>
  readonly useRootPitchLabel: () => React.ReactElement<OptionLabelProps>
}

export const useCovariantLabels = (): CovariantMenuLabels => {
  const useHarpKeyLabel = () => {
    const harpKeyId = useHarpGuruStore((state) => state.harpKeyId)
    return (
      <OptionLabel
        title={'Harp key'}
        isLargeTitle={false}
        value={getPitch(harpKeyId)}
        alignItems={'center'}
      />
    )
  }

  const usePozitionLabel = () => {
    const pozitionId = useHarpGuruStore((state) => state.pozitionId)
    return (
      <OptionLabel
        title={'Position'}
        isLargeTitle={false}
        value={getPozition(pozitionId)}
        alignItems={'center'}
      />
    )
  }

  const useRootPitchLabel = () => {
    const rootPitchId = useHarpGuruStore((state) => state.rootPitchId)
    return (
      <OptionLabel
        title={'Song key'}
        isLargeTitle={false}
        value={getPitch(rootPitchId)}
        alignItems={'center'}
      />
    )
  }

  return {
    useHarpKeyLabel,
    usePozitionLabel,
    useRootPitchLabel,
  }
}
