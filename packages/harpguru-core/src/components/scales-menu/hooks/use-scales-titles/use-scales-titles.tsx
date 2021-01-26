import React from 'react'
import { getScaleByDegreeIds } from 'harpparts'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import type { UseGlobal } from '../../../../types'

type ScalesMenuTitles = {
  readonly useScalesTitle: (
    arg0: UseGlobal
  ) => React.ReactElement<OptionLabelProps>
  readonly useChordsTitle: (
    arg0: UseGlobal
  ) => React.ReactElement<OptionLabelProps>
}

export const useScalesTitles = (): ScalesMenuTitles => {
  const useScalesTitle = (useGlobal: UseGlobal) => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { activeDegreeIds } = activeHarpStrata
    const { label: scaleLabel } = getScaleByDegreeIds(activeDegreeIds) || {}
    return (
      <OptionLabel
        name={'Scales'}
        isLargeTitle={true}
        value={scaleLabel || ''}
        alignItems={'flex-start'}
      />
    )
  }

  const useChordsTitle = (useGlobal: UseGlobal) => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { activeDegreeIds } = activeHarpStrata
    const { label: scaleLabel } = getScaleByDegreeIds(activeDegreeIds) || {}
    return (
      <OptionLabel
        name={'Chords'}
        isLargeTitle={true}
        value={scaleLabel || ''}
        alignItems={'flex-start'}
      />
    )
  }

  return { useScalesTitle, useChordsTitle }
}
