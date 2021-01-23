import { useGlobal, useDispatch } from 'reactn'
import { Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { PitchIds, PozitionIds } from 'harpparts'
import type { CovariancePrimer } from 'harpcovariance'
import { getCovarianceSeries, CovariantMembers } from 'harpcovariance'
import { Feather } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { OptionItem } from '../option-item'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { getOptionStyles } from '../../utils'
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
      .map((item, index) => [
        <OptionItem
          key={`${index}-0`}
          label={item.pozitionId}
          isSelected={item.pozitionId === pozitionId}
          itemTapHandler={itemTapHandler}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
          side={'LEFT'}
        />,
        <OptionItem
          key={`${index}-1`}
          label={item.rootPitchId}
          isSelected={item.rootPitchId === rootPitchId}
          itemTapHandler={itemTapHandler}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
          side={'RIGHT'}
        />,
      ])
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
      .map((item, index) => [
        <OptionItem
          key={`${index}-0`}
          label={item.rootPitchId}
          isSelected={item.rootPitchId === rootPitchId}
          itemTapHandler={itemTapHandler}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
          side={'LEFT'}
        />,
        <OptionItem
          key={`${index}-1`}
          label={item.harpKeyId}
          isSelected={item.harpKeyId === harpKeyId}
          itemTapHandler={itemTapHandler}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
          side={'RIGHT'}
        />,
      ])
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
      .map((item, index) => [
        <OptionItem
          key={`${index}-0`}
          label={item.harpKeyId}
          isSelected={item.harpKeyId === harpKeyId}
          itemTapHandler={itemTapHandler}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
          side={'LEFT'}
        />,
        <OptionItem
          key={`${index}-1`}
          label={item.pozitionId}
          isSelected={item.pozitionId === pozitionId}
          itemTapHandler={itemTapHandler}
          callbackParam={{
            harpKeyId: item.harpKeyId,
            pozitionId: item.pozitionId,
          }}
          twoColumns={true}
          side={'RIGHT'}
        />,
      ])
      .flat()
    return rootPitchItems
  }, [useGlobal])

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
    const styles = getOptionStyles()
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={styles.columnLabelHighlight} />
        <Text style={styles.columnLabelTitle}>Harp key</Text>
        <Text style={styles.columnLabelSub}>{harpKeyId}</Text>
      </View>
    )
  }, [useGlobal])

  const usePozitionLabel = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { pozitionId } = activeHarpStrata
    const styles = getOptionStyles()
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={styles.columnLabelHighlight} />
        <Text style={styles.columnLabelTitle}>Position</Text>
        <Text style={styles.columnLabelSub}>{pozitionId}</Text>
      </View>
    )
  }, [useGlobal])

  const useRootPitchLabel = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { rootPitchId } = activeHarpStrata
    const styles = getOptionStyles()
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={styles.columnLabelHighlight} />
        <Text style={styles.columnLabelTitle}>Song key</Text>
        <Text style={styles.columnLabelSub}>{rootPitchId}</Text>
      </View>
    )
  }, [useGlobal])

  const sizes = getSizes()

  const optionPropsz: ReadonlyArray<OptionProps> = [
    {
      title: 'Harp key',
      useSubTitle: useHarpKeySubtitle,
      useItems: useHarpKeyItems,
      twoColumns: true,
      useLeftColumnLabel: usePozitionLabel,
      useRightColumnLabel: useRootPitchLabel,
    },
    {
      title: 'Position',
      useSubTitle: usePozitionSubtitle,
      useItems: usePozitionItems,
      twoColumns: true,
      useLeftColumnLabel: useRootPitchLabel,
      useRightColumnLabel: useHarpKeyLabel,
    },
    {
      title: 'Song key',
      useSubTitle: useRootPitchSubtitle,
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
