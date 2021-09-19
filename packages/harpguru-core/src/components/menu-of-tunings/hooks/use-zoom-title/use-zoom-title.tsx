import React from 'react'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import type { UseGlobal } from '../../../../types'

export const useZoomTitle = (
  useGlobal: UseGlobal
): React.ReactElement<OptionLabelProps> => {
  const [columnBounds] = useGlobal('columnBounds')
  const explanatoryText = (() => {
    if (columnBounds === 'FIT') {
      return 'Show full harp'
    }
    const [startColumn, endColumn] = columnBounds
    const columnCount = endColumn - startColumn + 1
    return `Limit to ${columnCount} holes`
  })()
  return (
    <OptionLabel
      title={'Zoom'}
      isLargeTitle={true}
      value={explanatoryText}
      alignItems={'flex-start'}
    />
  )
}
