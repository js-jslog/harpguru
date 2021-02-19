import React from 'react'
import type { DegreeIds } from 'harpparts'
import {
  getScale,
  getScaleByDegreeIds,
  getScaleIds,
  ScaleCategory,
} from 'harpparts'

import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'
import { OptionBreak } from '../../../option-break'
import type { UseGlobal } from '../../../../types'

type ItemCallback = ReadonlyArray<DegreeIds>
type ItemTapHandler = (arg0: ReadonlyArray<DegreeIds>) => void

type UseScalesItems = (
  arg0: UseGlobal,
  arg1: ItemTapHandler
) => ReadonlyArray<React.ReactElement<OptionItemProps<ItemCallback>>>

type ScalesItemsz = {
  readonly useScalesItems: UseScalesItems
  readonly useChordsItems: UseScalesItems
}

export const useScalesItemsz = (): ScalesItemsz => {
  const useScalesItems = (
    useGlobal: UseGlobal,
    itemTapHandler: ItemTapHandler
  ) => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { activeDegreeIds } = activeHarpStrata
    const { label: activeScaleId } = getScaleByDegreeIds(activeDegreeIds) || {
      id: '',
    }
    const scales = getScaleIds()
      .map((id) => getScale(id))
      .filter((scale) => scale.category === ScaleCategory.Scale)
    return [
      <OptionItem
        key={'clear-all-scales'}
        value={'Clear all'}
        isSelected={false}
        itemTapHandler={itemTapHandler}
        callbackParam={[]}
        twoColumns={false}
      />,
      <OptionBreak key={'option-break-scales'} />,
      ...scales.map((item, index) => (
        <OptionItem
          key={`${index}`}
          value={item.label}
          isSelected={item.label === activeScaleId}
          itemTapHandler={itemTapHandler}
          callbackParam={item.degrees}
          twoColumns={false}
        />
      )),
    ]
  }

  const useChordsItems = (
    useGlobal: UseGlobal,
    itemTapHandler: ItemTapHandler
  ) => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { activeDegreeIds } = activeHarpStrata
    const { label: activeScaleId } = getScaleByDegreeIds(activeDegreeIds) || {
      id: '',
    }
    const chords = getScaleIds()
      .map((id) => getScale(id))
      .filter((scale) => scale.category === ScaleCategory.Chord)
    return [
      <OptionItem
        key={'clear-all-chords'}
        value={'Clear all'}
        isSelected={false}
        itemTapHandler={itemTapHandler}
        callbackParam={[]}
        twoColumns={false}
      />,
      <OptionBreak key={'option-break-chords'} />,
      ...chords.map((item, index) => (
        <OptionItem
          key={`${index}`}
          value={item.label}
          isSelected={item.label === activeScaleId}
          itemTapHandler={itemTapHandler}
          callbackParam={item.degrees}
          twoColumns={false}
        />
      )),
    ]
  }

  return { useScalesItems, useChordsItems }
}
