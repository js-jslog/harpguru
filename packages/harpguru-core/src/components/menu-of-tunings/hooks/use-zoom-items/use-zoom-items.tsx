import React from 'react'

import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'
import { ZoomIds } from '../../../../types'
import type { UseGlobal } from '../../../../types'

type ItemCallback = ZoomIds
type ItemTapHandler = (arg0: ZoomIds) => void

type ValvingItems = ReadonlyArray<
  React.ReactElement<OptionItemProps<ItemCallback>>
>

export const useZoomItems = (
  useGlobal: UseGlobal,
  itemTapHandler: ItemTapHandler
): ValvingItems => {
  const [columnBounds] = useGlobal('columnBounds')
  const zoomIds = [ZoomIds.Fit, ZoomIds.Seven]
  const activeZoom = (() => {
    if (columnBounds === 'FIT') return ZoomIds.Fit
    const [startColumn, endColumn] = columnBounds
    const columnCount = endColumn - startColumn + 1
    if (columnCount === 7) return ZoomIds.Seven
    //if (columnCount === 10) return ZoomIds.Ten
    //if (columnCount === 12) return ZoomIds.Twelve
    throw Error(`
      Unexpected column range detected.

      Start: ${startColumn}
      End: ${endColumn}
    `)
  })()
  const items = zoomIds.map((id, index) => (
    <OptionItem
      key={`${index}`}
      value={id}
      isSelected={id === activeZoom}
      itemTapHandler={itemTapHandler}
      callbackParam={id}
      twoColumns={false}
    />
  ))
  return items
}
