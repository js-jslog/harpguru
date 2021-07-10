import React from 'react'
import { getScaleByDegreeIds } from 'harpparts'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import type { UseGlobal } from '../../../../types'

export const useScaleTitle = (
  useGlobal: UseGlobal
): React.ReactElement<OptionLabelProps> => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { activeDegreeIds } = activeHarpStrata
  const { label: scaleLabel } = getScaleByDegreeIds(activeDegreeIds) || {}
  return (
    <OptionLabel
      title={'Scale'}
      isLargeTitle={true}
      value={scaleLabel || ''}
      alignItems={'flex-start'}
    />
  )
}
