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
  // TOOMANYRENDERS
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const {
    apparatus: { tuningId },
  } = activeHarpStrata
  const commonTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.Common)
  const seydelTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.Seydel)
  const brendanPowerTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.BrendanPower)
  const joeFiliskoTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.JoeFilisko)
  const richterModesTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.RichterModes)
  const spiralModesTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.SpiralModes)
  const otherScalesTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.OtherScales)
  const otherTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.Other)

  return [
    <OptionBreak
      title={TuningCategories.Common}
      isTopPadded={false}
      key={'option-break-common'}
    />,
    ...commonTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
    <OptionBreak
      title={TuningCategories.Seydel}
      isTopPadded={true}
      key={'option-break-seydel'}
    />,
    ...seydelTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
    <OptionBreak
      title={TuningCategories.BrendanPower}
      isTopPadded={true}
      key={'option-break-brendan-power'}
    />,
    ...brendanPowerTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
    <OptionBreak
      title={TuningCategories.JoeFilisko}
      isTopPadded={true}
      key={'option-break-joe-filisko'}
    />,
    ...joeFiliskoTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
    <OptionBreak
      title={TuningCategories.RichterModes}
      isTopPadded={true}
      key={'option-break-richter-modes'}
    />,
    ...richterModesTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
    <OptionBreak
      title={TuningCategories.SpiralModes}
      isTopPadded={true}
      key={'option-break-spiral-modes'}
    />,
    ...spiralModesTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
    <OptionBreak
      title={TuningCategories.OtherScales}
      isTopPadded={true}
      key={'option-break-other-scales'}
    />,
    ...otherScalesTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
    <OptionBreak
      title={TuningCategories.Other}
      isTopPadded={true}
      key={'option-break-other'}
    />,
    ...otherTunings.map((tuning, index) => (
      <OptionItem
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
  ]
}
