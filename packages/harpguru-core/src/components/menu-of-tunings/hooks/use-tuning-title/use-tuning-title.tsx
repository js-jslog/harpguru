import React from 'react'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import type { UseGlobal } from '../../../../types'

export const useTuningTitle = (
  useGlobal: UseGlobal
): React.ReactElement<OptionLabelProps> => {
  // TOOMANYRENDERS
  const [tuningId] = useGlobal('tuningId')
  return (
    <OptionLabel
      title={'Tuning'}
      isLargeTitle={true}
      value={tuningId}
      alignItems={'flex-start'}
    />
  )
}
