import React from 'react'
import type { HarpStrataProps } from 'harpstrata'
import { PozitionIds, PitchIds, getPozition, getPitch } from 'harpparts'
import type { CovariancePrimer } from 'harpcovariance'
import { getCovarianceSeries, CovariantMembers } from 'harpcovariance'

import { OptionItemWithDisplayMode } from '../../../option-item-with-display-mode'
import type { OptionItemWithDisplayModeProps } from '../../../option-item-with-display-mode'
import type { UseGlobal, DisplayModes } from '../../../../types'

type ItemCallback = Pick<HarpStrataProps, 'harpKeyId' | 'pozitionId'>
type ItemTapHandler = (arg0: DisplayModes, arg1: ItemCallback) => void

type UseCovariantItems = (
  arg0: UseGlobal,
  arg1: ItemTapHandler
) => ReadonlyArray<
  React.ReactElement<OptionItemWithDisplayModeProps<ItemCallback>>
>

type CovariantItems = {
  readonly useHarpKeyItems: UseCovariantItems
  readonly usePozitionItems: UseCovariantItems
  readonly useRootPitchItems: UseCovariantItems
}

export const useCovariantItems = (): CovariantItems => {
  const useHarpKeyItems = (
    useGlobal: UseGlobal,
    itemTapHandler: ItemTapHandler
  ) => {
    // TOOMANYRENDERS: if we create more dedicated global states
    // then we can potentially avoid rerending when things like
    // active pitches change which I think will be the most common.
    const [harpKeyId] = useGlobal('harpKeyId')
    const [pozitionId] = useGlobal('pozitionId')
    const [rootPitchId] = useGlobal('rootPitchId')
    const [activeDisplayMode] = useGlobal('activeDisplayMode')
    const harpKeyPrimer: CovariancePrimer = {
      lockedType: CovariantMembers.HarpKey,
      variedType: CovariantMembers.Pozition,
      lockedValue: harpKeyId,
      variedValue: PozitionIds.First,
    }
    const harpKeySeries = getCovarianceSeries(harpKeyPrimer)
    const harpKeyItems = harpKeySeries
      .map((item, index) => [
        <OptionItemWithDisplayMode
          key={`${index}-0`}
          value={getPozition(item.pozitionId)}
          isSelected={item.pozitionId === pozitionId}
          itemTapHandler={itemTapHandler}
          displayMode={activeDisplayMode}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
        />,
        <OptionItemWithDisplayMode
          key={`${index}-1`}
          value={getPitch(item.rootPitchId)}
          isSelected={item.rootPitchId === rootPitchId}
          itemTapHandler={itemTapHandler}
          displayMode={activeDisplayMode}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
        />,
      ])
      .flat()
    return harpKeyItems
  }

  const usePozitionItems = (
    useGlobal: UseGlobal,
    itemTapHandler: ItemTapHandler
  ) => {
    const [harpKeyId] = useGlobal('harpKeyId')
    const [pozitionId] = useGlobal('pozitionId')
    const [rootPitchId] = useGlobal('rootPitchId')
    const [activeDisplayMode] = useGlobal('activeDisplayMode')
    const pozitionPrimer: CovariancePrimer = {
      lockedType: CovariantMembers.Pozition,
      variedType: CovariantMembers.RootPitch,
      lockedValue: pozitionId,
      variedValue: PitchIds.A,
    }
    const pozitionSeries = getCovarianceSeries(pozitionPrimer)
    const pozitionItems = pozitionSeries
      .map((item, index) => [
        <OptionItemWithDisplayMode
          key={`${index}-0`}
          value={getPitch(item.rootPitchId)}
          isSelected={item.rootPitchId === rootPitchId}
          itemTapHandler={itemTapHandler}
          displayMode={activeDisplayMode}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
        />,
        <OptionItemWithDisplayMode
          key={`${index}-1`}
          value={getPitch(item.harpKeyId)}
          isSelected={item.harpKeyId === harpKeyId}
          itemTapHandler={itemTapHandler}
          displayMode={activeDisplayMode}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
        />,
      ])
      .flat()
    return pozitionItems
  }

  const useRootPitchItems = (
    useGlobal: UseGlobal,
    itemTapHandler: ItemTapHandler
  ) => {
    const [harpKeyId] = useGlobal('harpKeyId')
    const [pozitionId] = useGlobal('pozitionId')
    const [rootPitchId] = useGlobal('rootPitchId')
    const [activeDisplayMode] = useGlobal('activeDisplayMode')
    const rootPitchPrimer: CovariancePrimer = {
      lockedType: CovariantMembers.RootPitch,
      variedType: CovariantMembers.HarpKey,
      lockedValue: rootPitchId,
      variedValue: PitchIds.A,
    }
    const rootPitchSeries = getCovarianceSeries(rootPitchPrimer)
    const rootPitchItems = rootPitchSeries
      .map((item, index) => [
        <OptionItemWithDisplayMode
          key={`${index}-0`}
          value={getPitch(item.harpKeyId)}
          isSelected={item.harpKeyId === harpKeyId}
          itemTapHandler={itemTapHandler}
          displayMode={activeDisplayMode}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
        />,
        <OptionItemWithDisplayMode
          key={`${index}-1`}
          value={getPozition(item.pozitionId)}
          isSelected={item.pozitionId === pozitionId}
          itemTapHandler={itemTapHandler}
          displayMode={activeDisplayMode}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
        />,
      ])
      .flat()
    return rootPitchItems
  }

  return {
    useHarpKeyItems,
    usePozitionItems,
    useRootPitchItems,
  }
}
