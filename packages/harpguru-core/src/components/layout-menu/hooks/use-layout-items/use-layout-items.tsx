import React from 'react'
import type { ApparatusIds } from 'harpparts'
import { getApparatusIds } from 'harpparts'

import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'
import type { UseGlobal } from '../../../../types'

type ItemCallback = ApparatusIds
type ItemTapHandler = (arg0: ApparatusIds) => void

type UseLayoutItems = (
  arg0: UseGlobal,
  arg1: ItemTapHandler
) => ReadonlyArray<React.ReactElement<OptionItemProps<ItemCallback>>>

type LayoutItems = {
  readonly useItems: UseLayoutItems
}

export const useLayoutItems = (): LayoutItems => {
  const useItems = (useGlobal: UseGlobal, itemTapHandler: ItemTapHandler) => {
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

  return { useItems }
}
