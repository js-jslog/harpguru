import React from 'react'

import { getZoomText } from '../../utils'
import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import { determineZoomId } from '../../../../utils'
import { useHarpGuruStore } from '../../../../store'

export const useZoomTitle = (): React.ReactElement<OptionLabelProps> => {
  const columnBounds = useHarpGuruStore((state) => state.columnBounds)
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
