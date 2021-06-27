import React from 'react'
import { ValvingIds } from 'harpparts'

import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'
import type { UseGlobal } from '../../../../types'

type ItemCallback = ValvingIds
type ItemTapHandler = (arg0: ValvingIds) => void

type ValvingItems = ReadonlyArray<
  React.ReactElement<OptionItemProps<ItemCallback>>
>

const { NotValved, HalfValved } = ValvingIds

export const useValvingItems = (
  useGlobal: UseGlobal,
  itemTapHandler: ItemTapHandler
): ValvingItems => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const {
    apparatus: { valvingId },
  } = activeHarpStrata
  const items = [NotValved, HalfValved].map((id, index) => (
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
