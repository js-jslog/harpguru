import React from 'react'
import type { TuningIds } from 'harpparts'
import { getTuningIds, getTuning, TuningCategories } from 'harpparts'

import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'
import { OptionBreak } from '../../../option-break'
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
    apparatus: { tuningId },
  } = activeHarpStrata
  const commonTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.Common)
  const brendanPowerTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.BrendanPower)
  const joeFiliskoTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.JoeFilisko)
  const modalTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.Modal)
  const otherTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.Other)

  return [
    <OptionBreak title={TuningCategories.Common} key={'option-break-scales'} />,
    ...commonTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
    <OptionBreak
      title={TuningCategories.BrendanPower}
      key={'option-break-scales'}
    />,
    ...brendanPowerTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
    <OptionBreak
      title={TuningCategories.JoeFilisko}
      key={'option-break-scales'}
    />,
    ...joeFiliskoTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
    <OptionBreak title={TuningCategories.Modal} key={'option-break-scales'} />,
    ...modalTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
    <OptionBreak title={TuningCategories.Other} key={'option-break-scales'} />,
    ...otherTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
  ]
}
