import React from 'react'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import type { UseGlobal } from '../../../../types'

export const useValvingTitle = (
  useGlobal: UseGlobal
): React.ReactElement<OptionLabelProps> => {
  // TOOMANYRENDERS
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const {
    apparatus: { valvingId },
  } = activeHarpStrata
  return (
    <OptionLabel
      title={'Valving'}
      isLargeTitle={true}
      value={valvingId}
      alignItems={'flex-start'}
    />
  )
}
