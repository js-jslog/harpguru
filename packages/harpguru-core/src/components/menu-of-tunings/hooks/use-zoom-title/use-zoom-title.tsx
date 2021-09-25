import React from 'react'

import { getZoomText } from '../../utils'
import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import { determineZoomId } from '../../../../utils'
import type { UseGlobal } from '../../../../types'

export const useZoomTitle = (
  useGlobal: UseGlobal
): React.ReactElement<OptionLabelProps> => {
  // TOOMANYRENDERS
  const [columnBounds] = useGlobal('columnBounds')
  const zoomId = determineZoomId(columnBounds)
  const labelText = getZoomText(zoomId)
  return (
    <OptionLabel
      title={'Zoom'}
      isLargeTitle={true}
      value={labelText}
      alignItems={'flex-start'}
    />
  )
}
