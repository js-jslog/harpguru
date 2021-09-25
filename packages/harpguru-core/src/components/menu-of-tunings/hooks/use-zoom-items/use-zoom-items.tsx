import React from 'react'

import { getZoomText } from '../../utils'
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
  // TOOMANYRENDERS: Perhaps if we had a zoomid global state which were always
  // deduced whenever the columnBounds were updated we wouldn't have to
  // update these labels when the column bounds are changed but only if they
  // have atually changed length. This will be relevant when the widget to
  // shift left and right while zoomed have been added.
  const [columnBounds] = useGlobal('columnBounds')
  const activeZoomId = determineZoomId(columnBounds)
  const zoomIds = [ZoomIds.Fit, ZoomIds.Seven, ZoomIds.Ten, ZoomIds.Twelve]
  const items = zoomIds.map((id, index) => (
    <OptionItem
      key={`${index}`}
      value={getZoomText(id)}
      isSelected={id === activeZoomId}
      itemTapHandler={itemTapHandler}
      callbackParam={id}
      twoColumns={false}
    />
  ))
  return items
}
