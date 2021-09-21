import React from 'react'

import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'
import { determineZoomId } from '../../../../utils'
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
  const activeZoomId = determineZoomId(columnBounds)
  const zoomIds = [ZoomIds.Fit, ZoomIds.Seven]
  const items = zoomIds.map((id, index) => (
    <OptionItem
      key={`${index}`}
      value={id}
      isSelected={id === activeZoomId}
      itemTapHandler={itemTapHandler}
      callbackParam={id}
      twoColumns={false}
    />
  ))
  return items
}
