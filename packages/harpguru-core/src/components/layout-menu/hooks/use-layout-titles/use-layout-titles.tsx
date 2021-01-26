import React from 'react'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import type { UseGlobal } from '../../../../types'

type LayoutMenuTitles = {
  readonly useTitle: (arg0: UseGlobal) => React.ReactElement<OptionLabelProps>
}

export const useLayoutTitles = (): LayoutMenuTitles => {
  const useTitle = (useGlobal: UseGlobal) => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const {
      apparatus: { id: apparatusId },
    } = activeHarpStrata
    return (
      <OptionLabel
        name={'Tuning'}
        isLargeTitle={true}
        value={apparatusId}
        alignItems={'flex-start'}
      />
    )
  }

  return { useTitle }
}
