import React from 'react'
import { getScaleByDegreeIds, ScaleCategory } from 'harpparts'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import type { UseGlobal } from '../../../../types'

export const useScaleTitle = (
  useGlobal: UseGlobal
): React.ReactElement<OptionLabelProps> => {
  const [activeDegreeIds] = useGlobal('activeDegreeIds')
  const { label: scaleLabel, category: scaleCategory } =
    getScaleByDegreeIds(activeDegreeIds) || {}
  const title = scaleCategory === ScaleCategory.Chord ? 'Chord' : 'Scale'
  return (
    <OptionLabel
      title={title}
      isLargeTitle={true}
      value={scaleLabel || ''}
      alignItems={'flex-start'}
    />
  )
}
