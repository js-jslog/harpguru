import { useGlobal, useDispatch } from 'reactn'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native'
import React, { useCallback } from 'react'
import type { HarpStrataProps } from 'harpstrata'
import { PitchIds, PozitionIds } from 'harpparts'
import type { CovariancePrimer } from 'harpcovariance'
import { getCovarianceSeries, CovariantMembers } from 'harpcovariance'
import { Feather } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { getOptionStyles } from '../../utils'
import type { ListItemProps_Double, MenuProps, OptionProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getNewHarpStrataForDispatcher } from './utils'

const ListItem = (
  props: ListItemProps_Double<Pick<HarpStrataProps, 'harpKeyId' | 'pozitionId'>>
): React.ReactElement => {
  const { side } = props
  const styles = getOptionStyles()
  const sideStyle =
    side === 'LEFT' ? styles.optionSelectedLeft : styles.optionSelectedRight
  const textElement = props.isSelected ? (
    <Text
      style={[
        styles.optionText,
        styles.optionTextDouble,
        styles.optionSelected,
        sideStyle,
      ]}
    >
      {props.label}
    </Text>
  ) : (
    <Text style={[styles.optionText, styles.optionTextDouble]}>
      {props.label}
    </Text>
  )
  return (
    <TouchableOpacity
      disabled={props.isSelected ? true : false}
      onPress={() => props.itemTapHandler(props.callbackParam)}
    >
      {textElement}
    </TouchableOpacity>
  )
}

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
        <ListItem
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
        <ListItem
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
        <ListItem
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
        <ListItem
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
        <ListItem
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
        <ListItem
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
