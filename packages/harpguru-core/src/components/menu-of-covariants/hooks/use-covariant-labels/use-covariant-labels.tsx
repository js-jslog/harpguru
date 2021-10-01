import { useGlobal } from 'reactn'
import React from 'react'
import { getPitch, getPozition } from 'harpparts'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import type { UseGlobal } from '../../../../types'

type CovariantMenuLabels = {
  readonly useHarpKeyLabel: (
    arg0: UseGlobal
  ) => React.ReactElement<OptionLabelProps>
  readonly usePozitionLabel: (
    arg0: UseGlobal
  ) => React.ReactElement<OptionLabelProps>
  readonly useRootPitchLabel: (
    arg0: UseGlobal
  ) => React.ReactElement<OptionLabelProps>
}

export const useCovariantLabels = (): CovariantMenuLabels => {
  const useHarpKeyLabel = () => {
    // TOOMANYRENDERS: A
    const [harpKeyId] = useGlobal('harpKeyId')
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
    const [pozitionId] = useGlobal('pozitionId')
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
    const [rootPitchId] = useGlobal('rootPitchId')
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
