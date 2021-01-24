import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { PitchIds, PozitionIds } from 'harpparts'
import type { CovariancePrimer } from 'harpcovariance'
import { getCovarianceSeries, CovariantMembers } from 'harpcovariance'
import { Feather } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { OptionLabel } from '../option-label'
import { OptionItem } from '../option-item'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import type { MenuProps, OptionProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getNewHarpStrataForDispatcher } from './utils'

export const CovariantMenu = (menuProps: MenuProps): React.ReactElement => {
  const itemTapHandler = useCallback(
    useDispatch(getNewHarpStrataForDispatcher),
    [useDispatch]
  )
  const useHarpKeyItems = useCallback(() => {
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
      .map((item, index) => {
        const {
          pozitionId: [pozitionLabel, ...pozitionSuperscript],
        } = item
        const {
          rootPitchId: [rootPitchLabel, ...rootPitchSuperscript],
        } = item
        return [
          <OptionItem
            key={`${index}-0`}
            label={pozitionLabel}
            superscript={pozitionSuperscript.join('')}
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
            label={rootPitchLabel}
            superscript={rootPitchSuperscript.join('')}
            isSelected={item.rootPitchId === rootPitchId}
            itemTapHandler={itemTapHandler}
            callbackParam={{
              harpKeyId: item.harpKeyId,
              pozitionId: item.pozitionId,
            }}
            twoColumns={true}
          />,
        ]
      })
      .flat()
    return harpKeyItems
  }, [useGlobal])

  const usePozitionItems = useCallback(() => {
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
      .map((item, index) => {
        const {
          rootPitchId: [rootPitchLabel, ...rootPitchSuperscript],
        } = item
        const {
          harpKeyId: [harpKeyLabel, ...harpKeySuperscript],
        } = item
        return [
          <OptionItem
            key={`${index}-0`}
            label={rootPitchLabel}
            superscript={rootPitchSuperscript.join('')}
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
            label={harpKeyLabel}
            superscript={harpKeySuperscript.join('')}
            isSelected={item.harpKeyId === harpKeyId}
            itemTapHandler={itemTapHandler}
            callbackParam={{
              harpKeyId: item.harpKeyId,
              pozitionId: item.pozitionId,
            }}
            twoColumns={true}
          />,
        ]
      })
      .flat()
    return pozitionItems
  }, [useGlobal])

  const useRootPitchItems = useCallback(() => {
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
      .map((item, index) => {
        const {
          harpKeyId: [harpKeyLabel, ...harpKeySuperscript],
        } = item
        const {
          pozitionId: [pozitionLabel, ...pozitionSuperscript],
        } = item
        return [
          <OptionItem
            key={`${index}-0`}
            label={harpKeyLabel}
            superscript={harpKeySuperscript.join('')}
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
            label={pozitionLabel}
            superscript={pozitionSuperscript.join('')}
            isSelected={item.pozitionId === pozitionId}
            itemTapHandler={itemTapHandler}
            callbackParam={{
              harpKeyId: item.harpKeyId,
              pozitionId: item.pozitionId,
            }}
            twoColumns={true}
          />,
        ]
      })
      .flat()
    return rootPitchItems
  }, [useGlobal])

  const useHarpKeyTitle = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { harpKeyId } = activeHarpStrata
    return (
      <OptionLabel
        title={'Harp key'}
        subtitle={harpKeyId}
        alignItems={'center'}
        labelIsTitle={true}
      />
    )
  }, [useGlobal])

  const usePozitionTitle = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { pozitionId } = activeHarpStrata
    return (
      <OptionLabel
        title={'Position'}
        subtitle={pozitionId}
        alignItems={'center'}
        labelIsTitle={true}
      />
    )
  }, [useGlobal])

  const useRootPitchTitle = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { rootPitchId } = activeHarpStrata
    return (
      <OptionLabel
        title={'Song key'}
        subtitle={rootPitchId}
        alignItems={'center'}
        labelIsTitle={true}
      />
    )
  }, [useGlobal])

  const useHarpKeyLabel = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { harpKeyId } = activeHarpStrata
    return (
      <OptionLabel
        title={'Harp key'}
        subtitle={harpKeyId}
        alignItems={'center'}
        labelIsTitle={false}
      />
    )
  }, [useGlobal])

  const usePozitionLabel = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { pozitionId } = activeHarpStrata
    return (
      <OptionLabel
        title={'Position'}
        subtitle={pozitionId}
        alignItems={'center'}
        labelIsTitle={false}
      />
    )
  }, [useGlobal])

  const useRootPitchLabel = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { rootPitchId } = activeHarpStrata
    return (
      <OptionLabel
        title={'Song key'}
        subtitle={rootPitchId}
        alignItems={'center'}
        labelIsTitle={false}
      />
    )
  }, [useGlobal])

  const sizes = getSizes()

  const optionPropsz: ReadonlyArray<OptionProps> = [
    {
      useTitle: useHarpKeyTitle,
      useItems: useHarpKeyItems,
      twoColumns: true,
      useLeftColumnLabel: usePozitionLabel,
      useRightColumnLabel: useRootPitchLabel,
    },
    {
      useTitle: usePozitionTitle,
      useItems: usePozitionItems,
      twoColumns: true,
      useLeftColumnLabel: useRootPitchLabel,
      useRightColumnLabel: useHarpKeyLabel,
    },
    {
      useTitle: useRootPitchTitle,
      useItems: useRootPitchItems,
      twoColumns: true,
      useLeftColumnLabel: useHarpKeyLabel,
      useRightColumnLabel: usePozitionLabel,
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
