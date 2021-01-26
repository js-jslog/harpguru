import React from 'react'
import { getPitch, getPozition } from 'harpparts'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import type { UseGlobal } from '../../../../types'

type CovariantMenuTitles = {
  readonly useHarpKeyTitle: (
    arg0: UseGlobal
  ) => React.ReactElement<OptionLabelProps>
  readonly usePozitionTitle: (
    arg0: UseGlobal
  ) => React.ReactElement<OptionLabelProps>
  readonly useRootPitchTitle: (
    arg0: UseGlobal
  ) => React.ReactElement<OptionLabelProps>
}

export const useCovariantTitles = (): CovariantMenuTitles => {
  const useHarpKeyTitle = (useGlobal: UseGlobal) => {
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

  const usePozitionTitle = (useGlobal: UseGlobal) => {
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

  const useRootPitchTitle = (useGlobal: UseGlobal) => {
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
