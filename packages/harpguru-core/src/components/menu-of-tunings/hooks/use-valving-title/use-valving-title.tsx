import React from 'react'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import { useHarpGuruStore } from '../../../../store'

export const useValvingTitle = (): React.ReactElement<OptionLabelProps> => {
  const valvingId = useHarpGuruStore((state) => state.valvingId)
  return (
    <OptionLabel
      title={'Valving'}
      isLargeTitle={true}
      value={valvingId}
      alignItems={'flex-start'}
    />
  )
}
