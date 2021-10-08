import React from 'react'
import { getValvingIds, ValvingIds } from 'harpparts'

import { OptionItemWithDisplayMode } from '../../../option-item-with-display-mode'
import type { OptionItemWithDisplayModeProps } from '../../../option-item-with-display-mode'
import type { DisplayModes, UseGlobal } from '../../../../types'

type ItemCallback = ValvingIds
type ItemTapHandler = (arg0: DisplayModes, arg1: ValvingIds) => void

type ValvingItems = ReadonlyArray<
  React.ReactElement<OptionItemWithDisplayModeProps<ItemCallback>>
>

export const useValvingItems = (
  useGlobal: UseGlobal,
  itemTapHandler: ItemTapHandler
): ValvingItems => {
  const [valvingId] = useGlobal('valvingId')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const items = getValvingIds().map((id, index) => (
    <OptionItemWithDisplayMode
      key={`${index}`}
      value={id}
      isSelected={id === valvingId}
      itemTapHandler={itemTapHandler}
      displayMode={activeDisplayMode}
      callbackParam={id}
      twoColumns={false}
    />
  ))
  return items
}
