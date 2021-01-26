import { useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import type { HarpStrataProps } from 'harpstrata'
import { PozitionIds, PitchIds, getPozition, getPitch } from 'harpparts'
import type { CovariancePrimer } from 'harpcovariance'
import { getCovarianceSeries, CovariantMembers } from 'harpcovariance'

import { getNewHarpStrataForDispatcher } from '../../utils'
import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'
import type { UseGlobal } from '../../../../types'

type UseCovariantItems = (
  arg0: UseGlobal
) => ReadonlyArray<
  React.ReactElement<
    OptionItemProps<Pick<HarpStrataProps, 'harpKeyId' | 'pozitionId'>>
  >
>

type CovariantItems = {
  readonly useHarpKeyItems: UseCovariantItems
  readonly usePozitionItems: UseCovariantItems
  readonly useRootPitchItems: UseCovariantItems
}

export const useCovariantItems = (): CovariantItems => {
  // TODO: consider moving this back to menu and
  // pass in as a parameter
  const itemTapHandler = useCallback(
    useDispatch(getNewHarpStrataForDispatcher),
    [useDispatch]
  )
  const useHarpKeyItems = (useGlobal: UseGlobal) => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { harpKeyId, pozitionId, rootPitchId } = activeHarpStrata
    const harpKeyPrimer: CovariancePrimer = {
      lockedType: CovariantMembers.HarpKey,
      variedType: CovariantMembers.Pozition,
      lockedValue: harpKeyId,
      variedValue: PozitionIds.First,
    }
    const harpKeySeries = getCovarianceSeries(harpKeyPrimer)
    const harpKeyItems = harpKeySeries
      .map((item, index) => [
        <OptionItem
          key={`${index}-0`}
          value={getPozition(item.pozitionId)}
          isSelected={item.pozitionId === pozitionId}
          itemTapHandler={itemTapHandler}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
        />,
        <OptionItem
          key={`${index}-1`}
          value={getPitch(item.rootPitchId)}
          isSelected={item.rootPitchId === rootPitchId}
          itemTapHandler={itemTapHandler}
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

  const usePozitionItems = (useGlobal: UseGlobal) => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { harpKeyId, pozitionId, rootPitchId } = activeHarpStrata
    const pozitionPrimer: CovariancePrimer = {
      lockedType: CovariantMembers.Pozition,
      variedType: CovariantMembers.RootPitch,
      lockedValue: pozitionId,
      variedValue: PitchIds.A,
    }
    const pozitionSeries = getCovarianceSeries(pozitionPrimer)
    const pozitionItems = pozitionSeries
      .map((item, index) => [
        <OptionItem
          key={`${index}-0`}
          value={getPitch(item.rootPitchId)}
          isSelected={item.rootPitchId === rootPitchId}
          itemTapHandler={itemTapHandler}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
        />,
        <OptionItem
          key={`${index}-1`}
          value={getPitch(item.harpKeyId)}
          isSelected={item.harpKeyId === harpKeyId}
          itemTapHandler={itemTapHandler}
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

  const useRootPitchItems = (useGlobal: UseGlobal) => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { harpKeyId, pozitionId, rootPitchId } = activeHarpStrata
    const rootPitchPrimer: CovariancePrimer = {
      lockedType: CovariantMembers.RootPitch,
      variedType: CovariantMembers.HarpKey,
      lockedValue: rootPitchId,
      variedValue: PitchIds.A,
    }
    const rootPitchSeries = getCovarianceSeries(rootPitchPrimer)
    const rootPitchItems = rootPitchSeries
      .map((item, index) => [
        <OptionItem
          key={`${index}-0`}
          value={getPitch(item.harpKeyId)}
          isSelected={item.harpKeyId === harpKeyId}
          itemTapHandler={itemTapHandler}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
        />,
        <OptionItem
          key={`${index}-1`}
          value={getPozition(item.pozitionId)}
          isSelected={item.pozitionId === pozitionId}
          itemTapHandler={itemTapHandler}
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
