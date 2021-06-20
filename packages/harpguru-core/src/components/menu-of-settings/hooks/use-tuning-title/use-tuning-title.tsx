import React from 'react'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import type { UseGlobal } from '../../../../types'

export const useTuningTitle = (
  useGlobal: UseGlobal
): React.ReactElement<OptionLabelProps> => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const {
    apparatus: { tuningId: apparatusId },
  } = activeHarpStrata
  return (
    <OptionLabel
      title={'Tuning'}
      isLargeTitle={true}
      value={apparatusId}
      alignItems={'flex-start'}
    />
  )
}
