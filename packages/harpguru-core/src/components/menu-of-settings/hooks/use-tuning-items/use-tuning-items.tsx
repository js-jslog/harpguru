import React from 'react'
import type { ApparatusIds } from 'harpparts'
import { getApparatusIds } from 'harpparts'

import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'
import type { UseGlobal } from '../../../../types'

type ItemCallback = ApparatusIds
type ItemTapHandler = (arg0: ApparatusIds) => void

type TuningItems = ReadonlyArray<
  React.ReactElement<OptionItemProps<ItemCallback>>
>

export const useTuningItems = (
  useGlobal: UseGlobal,
  itemTapHandler: ItemTapHandler
): TuningItems => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const {
    apparatus: { id: apparatusId },
  } = activeHarpStrata
  const items = getApparatusIds().map((id, index) => (
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