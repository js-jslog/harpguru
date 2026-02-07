import React from 'react'
import { getPitch, getPozition } from 'harpparts'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import { useHarpGuruStore } from '../../../../store'

type CovariantMenuTitles = {
  readonly useHarpKeyTitle: () => React.ReactElement<OptionLabelProps>
  readonly usePozitionTitle: () => React.ReactElement<OptionLabelProps>
  readonly useRootPitchTitle: () => React.ReactElement<OptionLabelProps>
}

export const useCovariantTitles = (): CovariantMenuTitles => {
  const useHarpKeyTitle = () => {
    const harpKeyId = useHarpGuruStore((state) => state.harpKeyId)
    return (
      <OptionLabel
        title={'Harp key'}
        isLargeTitle={true}
        value={getPitch(harpKeyId)}
        alignItems={'center'}
      />
    )
  }

  const usePozitionTitle = () => {
    const pozitionId = useHarpGuruStore((state) => state.pozitionId)
    return (
      <OptionLabel
        title={'Position'}
        isLargeTitle={true}
        value={getPozition(pozitionId)}
        alignItems={'center'}
      />
    )
  }

  const useRootPitchTitle = () => {
    const rootPitchId = useHarpGuruStore((state) => state.rootPitchId)
    return (
      <OptionLabel
        title={'Song key'}
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
