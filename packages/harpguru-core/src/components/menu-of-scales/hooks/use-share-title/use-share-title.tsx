import React from 'react'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'

export const useShareTitle = (): React.ReactElement<OptionLabelProps> => (
  <OptionLabel
    title={'Share'}
    isLargeTitle={true}
    value={'This harp face as a link'}
    alignItems={'flex-start'}
  />
)
