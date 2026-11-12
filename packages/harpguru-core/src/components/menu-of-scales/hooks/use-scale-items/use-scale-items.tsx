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
import { useHarpGuruStore } from '../../../../store'

type ItemCallback = ReadonlyArray<DegreeIds>
type ItemTapHandler = (arg0: ReadonlyArray<DegreeIds>) => void

type ScaleItems = ReadonlyArray<
  React.ReactElement<OptionItemProps<ItemCallback>>
>

export const useScaleItems = (itemTapHandler: ItemTapHandler): ScaleItems => {
  const activeDegreeIds = useHarpGuruStore((state) => state.activeDegreeIds)
  const { label: activeScaleId } = getScaleByDegreeIds(activeDegreeIds) || {
    id: '',
  }
  const scales = getScaleIds()
    .map((id) => getScale(id))
    .filter((scale) => scale.category === ScaleCategory.Scale)
  const chords = getScaleIds()
    .map((id) => getScale(id))
    .filter((scale) => scale.category === ScaleCategory.Chord)

  return [
    <OptionItem
      key={'clear-all-scales'}
      value={'Clear all'}
      isSelected={false}
      itemTapHandler={itemTapHandler}
      callbackParam={[]}
      twoColumns={false}
    />,
    <OptionBreak
      title={'Scales'}
      isTopPadded={false}
      key={'option-break-scales'}
    />,
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
    <OptionBreak
      title={'Chords'}
      isTopPadded={true}
      key={'option-break-chords'}
    />,
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
