import React from 'react'
import { getValvingIds, ValvingIds } from 'harpparts'

import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'
import type { UseGlobal } from '../../../../types'

type ItemCallback = ValvingIds
type ItemTapHandler = (arg0: ValvingIds) => void

type ValvingItems = ReadonlyArray<
  React.ReactElement<OptionItemProps<ItemCallback>>
>

export const useValvingItems = (
  useGlobal: UseGlobal,
  itemTapHandler: ItemTapHandler
): ValvingItems => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const {
    apparatus: { valvingId },
  } = activeHarpStrata
  const items = getValvingIds().map((id, index) => (
    <OptionItem
      key={`${index}`}
      value={id}
      isSelected={id === valvingId}
      itemTapHandler={itemTapHandler}
      callbackParam={id}
      twoColumns={false}
    />
  ))
  return items
}
