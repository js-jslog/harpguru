import React from 'react'
import type { DegreeIds } from 'harpparts'
import {
  getScale,
  getScaleByDegreeIds,
  getScaleIds,
  ScaleCategory,
} from 'harpparts'

import { OptionItemWithDegreeIdList } from '../../../option-item-with-degreeid-list'
import type { OptionItemWithDegreeIdListProps } from '../../../option-item-with-degreeid-list'
import { OptionBreak } from '../../../option-break'
import type { UseGlobal } from '../../../../types'

type ItemCallback = ReadonlyArray<DegreeIds>
type ItemTapHandler = (
  arg0: ReadonlyArray<DegreeIds>,
  arg1: ReadonlyArray<DegreeIds>
) => void

type ScaleItems = ReadonlyArray<
  React.ReactElement<OptionItemWithDegreeIdListProps<ItemCallback>>
>

export const useScaleItems = (
  useGlobal: UseGlobal,
  itemTapHandler: ItemTapHandler
): ScaleItems => {
  const [activeDegreeIds] = useGlobal('activeDegreeIds')
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
    <OptionItemWithDegreeIdList
      key={'clear-all-scales'}
      value={'Clear all'}
      isSelected={false}
      itemTapHandler={itemTapHandler}
      degreeIds={activeDegreeIds}
      callbackParam={[]}
      twoColumns={false}
    />,
    <OptionBreak
      title={'Scales'}
      isTopPadded={false}
      key={'option-break-scales'}
    />,
    ...scales.map((item, index) => (
      <OptionItemWithDegreeIdList
        key={`${index}`}
        value={item.label}
        isSelected={item.label === activeScaleId}
        itemTapHandler={itemTapHandler}
        degreeIds={activeDegreeIds}
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
      <OptionItemWithDegreeIdList
        key={`${index}`}
        value={item.label}
        isSelected={item.label === activeScaleId}
        itemTapHandler={itemTapHandler}
        degreeIds={activeDegreeIds}
        callbackParam={item.degrees}
        twoColumns={false}
      />
    )),
  ]
}
