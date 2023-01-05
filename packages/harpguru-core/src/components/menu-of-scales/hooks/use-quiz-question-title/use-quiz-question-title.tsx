import React from 'react'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'

export const useQuizQuestionTitle =
  (): React.ReactElement<OptionLabelProps> => {
    return (
      <OptionLabel
        title={'Quiz questions'}
        isLargeTitle={true}
        value={'Select to include in quiz mode'}
        alignItems={'flex-start'}
      />
    )
  }
