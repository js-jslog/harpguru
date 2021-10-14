import React from 'react'
import type { TuningIds } from 'harpparts'
import { getTuningIds, getTuning, TuningCategories } from 'harpparts'

import { OptionItemWithDisplayMode } from '../../../option-item-with-display-mode'
import type { OptionItemWithDisplayModeProps } from '../../../option-item-with-display-mode'
import { OptionBreak } from '../../../option-break'
import type { DisplayModes, UseGlobal } from '../../../../types'

type ItemCallback = TuningIds
type ItemTapHandler = (arg0: DisplayModes, arg1: TuningIds) => void

type TuningItems = ReadonlyArray<
  React.ReactElement<OptionItemWithDisplayModeProps<ItemCallback>>
>

export const useTuningItems = (
  useGlobal: UseGlobal,
  itemTapHandler: ItemTapHandler
): TuningItems => {
  const [tuningId] = useGlobal('tuningId')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const commonTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.Common)
  const seydelTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.Seydel)
  const hohnerTunings = getTuningIds()
    .map((id) => getTuning(id))
    .filter((tuning) => tuning.category === TuningCategories.Hohner)
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
      <OptionItemWithDisplayMode
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        displayMode={activeDisplayMode}
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
      <OptionItemWithDisplayMode
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        displayMode={activeDisplayMode}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
    <OptionBreak
      title={TuningCategories.Hohner}
      isTopPadded={true}
      key={'option-break-hohner'}
    />,
    ...hohnerTunings.map((tuning, index) => (
      <OptionItemWithDisplayMode
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        displayMode={activeDisplayMode}
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
      <OptionItemWithDisplayMode
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        displayMode={activeDisplayMode}
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
      <OptionItemWithDisplayMode
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        displayMode={activeDisplayMode}
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
      <OptionItemWithDisplayMode
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        displayMode={activeDisplayMode}
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
      <OptionItemWithDisplayMode
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        displayMode={activeDisplayMode}
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
      <OptionItemWithDisplayMode
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        displayMode={activeDisplayMode}
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
      <OptionItemWithDisplayMode
        key={`${index}`}
        value={tuning.shortName || tuning.id}
        isSelected={tuning.id === tuningId}
        itemTapHandler={itemTapHandler}
        displayMode={activeDisplayMode}
        callbackParam={tuning.id}
        twoColumns={false}
      />
    )),
  ]
}
