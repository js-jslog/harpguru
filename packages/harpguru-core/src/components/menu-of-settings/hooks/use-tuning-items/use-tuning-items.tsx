import React from 'react'
import type { TuningIds } from 'harpparts'
import { getTuningIds } from 'harpparts'

import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'
import type { UseGlobal } from '../../../../types'

type ItemCallback = TuningIds
type ItemTapHandler = (arg0: TuningIds) => void

type TuningItems = ReadonlyArray<
  React.ReactElement<OptionItemProps<ItemCallback>>
>

export const useTuningItems = (
  useGlobal: UseGlobal,
  itemTapHandler: ItemTapHandler
): TuningItems => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const {
    apparatus: { tuningId: apparatusId },
  } = activeHarpStrata
  const items = getTuningIds().map((id, index) => (
    <OptionItem
      key={`${index}`}
      value={id}
      isSelected={id === apparatusId}
      itemTapHandler={itemTapHandler}
      callbackParam={id}
      twoColumns={false}
    />
  ))
  return items
}
