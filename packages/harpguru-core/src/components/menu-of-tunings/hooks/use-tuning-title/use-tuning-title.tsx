import React from 'react'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import { useHarpGuruStore } from '../../../../store'

export const useTuningTitle = (): React.ReactElement<OptionLabelProps> => {
  const tuningId = useHarpGuruStore((state) => state.tuningId)
  return (
    <OptionLabel
      title={'Tuning'}
      isLargeTitle={true}
      value={tuningId}
      alignItems={'flex-start'}
    />
  )
}
