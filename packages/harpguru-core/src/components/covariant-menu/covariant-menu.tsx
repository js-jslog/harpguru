import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { PitchIds, PozitionIds } from 'harpparts'
import type { CovariancePrimer } from 'harpcovariance'
import { getCovarianceSeries, CovariantMembers } from 'harpcovariance'
import { Feather } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import type { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getNewHarpStrataForDispatcher } from './utils'

export const CovariantMenu = (menuProps: MenuProps): React.ReactElement => {
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
    .map((item) => [
      {
        label: item.pozitionId,
        callbackParam: {
          harpKeyId: item.harpKeyId,
          pozitionId: item.pozitionId,
        },
      },
      {
        label: item.rootPitchId,
        callbackParam: {
          harpKeyId: item.harpKeyId,
          pozitionId: item.pozitionId,
        },
      },
    ])
    .flat()

  const pozitionPrimer: CovariancePrimer = {
    lockedType: CovariantMembers.Pozition,
    variedType: CovariantMembers.RootPitch,
    lockedValue: pozitionId,
    variedValue: PitchIds.A,
  }
  const pozitionSeries = getCovarianceSeries(pozitionPrimer)
  const pozitionItems = pozitionSeries
    .map((item) => [
      {
        label: item.rootPitchId,
        callbackParam: {
          harpKeyId: item.harpKeyId,
          pozitionId: item.pozitionId,
        },
      },
      {
        label: item.harpKeyId,
        callbackParam: {
          harpKeyId: item.harpKeyId,
          pozitionId: item.pozitionId,
        },
      },
    ])
    .flat()

  const rootPitchPrimer: CovariancePrimer = {
    lockedType: CovariantMembers.RootPitch,
    variedType: CovariantMembers.HarpKey,
    lockedValue: rootPitchId,
    variedValue: PitchIds.A,
  }
  const rootPitchSeries = getCovarianceSeries(rootPitchPrimer)
  const rootPitchItems = rootPitchSeries
    .map((item) => [
      {
        label: item.harpKeyId,
        callbackParam: {
          harpKeyId: item.harpKeyId,
          pozitionId: item.pozitionId,
        },
      },
      {
        label: item.pozitionId,
        callbackParam: {
          harpKeyId: item.harpKeyId,
          pozitionId: item.pozitionId,
        },
      },
    ])
    .flat()

  const itemTapHandler = useCallback(
    useDispatch(getNewHarpStrataForDispatcher),
    [useDispatch]
  )

  const useHarpKeySubtitle = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { harpKeyId } = activeHarpStrata
    return harpKeyId
  }, [useGlobal])

  const usePozitionSubtitle = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { pozitionId } = activeHarpStrata
    return pozitionId
  }, [useGlobal])

  const useRootPitchSubtitle = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { rootPitchId } = activeHarpStrata
    return rootPitchId
  }, [useGlobal])

  const useHarpKeyLabel = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { harpKeyId } = activeHarpStrata
    return `Harp key - ${harpKeyId}`
  }, [useGlobal])

  const usePozitionLabel = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { pozitionId } = activeHarpStrata
    return `Position - ${pozitionId}`
  }, [useGlobal])

  const useRootPitchLabel = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { rootPitchId } = activeHarpStrata
    return `Song key - ${rootPitchId}`
  }, [useGlobal])

  const sizes = getSizes()

  const optionPropsz = [
    {
      title: 'Harp key',
      useSubTitle: useHarpKeySubtitle,
      items: harpKeyItems,
      itemTapHandler,
      useLeftColumnLabel: usePozitionLabel,
      useRightColumnLabel: useRootPitchLabel,
    },
    {
      title: 'Position',
      useSubTitle: usePozitionSubtitle,
      items: pozitionItems,
      itemTapHandler,
      useLeftColumnLabel: useRootPitchLabel,
      useRightColumnLabel: useHarpKeyLabel,
    },
    {
      title: 'Song key',
      useSubTitle: useRootPitchSubtitle,
      items: rootPitchItems,
      itemTapHandler,
      useLeftColumnLabel: useRootPitchLabel,
      useRightColumnLabel: useHarpKeyLabel,
    },
  ]
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <MemoOptionStack optionPropsz={optionPropsz} />
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <Feather
          name="sliders"
          size={sizes.labelIconSize}
          color={colors.homeRowsColor}
        />
      </MenuOpenButton>
    </Menu>
  )
}
