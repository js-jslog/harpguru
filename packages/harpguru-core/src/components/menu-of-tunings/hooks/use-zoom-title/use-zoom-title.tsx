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
      return 'The harp is currently scaled so that it\'s full length is displayed'
    }
    const [startColumn, endColumn] = columnBounds
    const columnCount = endColumn - startColumn + 1
    return `The harp is currently scaled so that ${columnCount} holes are displayed at a larger size than usual`
  })()
  return (
    <OptionLabel
      title={'Tuning'}
      isLargeTitle={true}
      value={explanatoryText}
      alignItems={'flex-start'}
    />
  )
}
