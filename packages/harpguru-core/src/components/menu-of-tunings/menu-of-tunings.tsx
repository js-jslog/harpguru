import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { Entypo } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuFace } from '../menu-face'
import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { getColors } from '../../utils'
import type { MenuProps } from '../../types'
import { useSizes } from '../../hooks'

import {
  reduceForNewColumnBoundsByZoomId,
  reduceForNewHarpStrataByTuning,
  reduceForNewHarpStrataByValving,
} from './utils'
import {
  useTuningTitle,
  useTuningItems,
  useValvingTitle,
  useValvingItems,
  useZoomTitle,
  useZoomItems,
} from './hooks'

export const MenuOfTunings = (menuProps: MenuProps): React.ReactElement => {
  const useTuningTitleMemo = useCallback(() => useTuningTitle(useGlobal), [
    useGlobal,
  ])
  const tuningItemTapHandler = useCallback(
    useDispatch(
      (currentHarpStrata, activeDisplayMode, tuningId) =>
        reduceForNewHarpStrataByTuning(
          currentHarpStrata,
          activeDisplayMode,
          tuningId
        ),
      'activeHarpStrata'
    ),
    [useDispatch, reduceForNewHarpStrataByTuning]
  )
  const useTuningItemsMemo = useCallback(
    () => useTuningItems(useGlobal, tuningItemTapHandler),
    [useGlobal, tuningItemTapHandler]
  )

  const useValvingTitleMemo = useCallback(() => useValvingTitle(useGlobal), [
    useGlobal,
  ])
  const valvingItemTapHandler = useCallback(
    useDispatch(
      (currentHarpStrata, activeDisplayMode, valvingId) =>
        reduceForNewHarpStrataByValving(
          currentHarpStrata,
          activeDisplayMode,
          valvingId
        ),
      'activeHarpStrata'
    ),
    [useDispatch, reduceForNewHarpStrataByValving]
  )
  const useValvingItemsMemo = useCallback(
    () => useValvingItems(useGlobal, valvingItemTapHandler),
    [useGlobal, valvingItemTapHandler]
  )

  const useZoomTitleMemo = useCallback(() => useZoomTitle(useGlobal), [
    useGlobal,
  ])
  const zoomItemTapHandler = useCallback(
    useDispatch(
      (currentColumnBounds, activeDegreeMatrix, zoomId) =>
        reduceForNewColumnBoundsByZoomId(
          currentColumnBounds,
          activeDegreeMatrix,
          zoomId
        ),
      'sourceColumnBounds'
    ),
    // TODO: This and a great many other things should be based on the
    // interaction matrix of the apparatus rather than the degreeMatrix
    // which is much more volatile
    [useDispatch, reduceForNewColumnBoundsByZoomId]
  )
  const useZoomItemsMemo = useCallback(
    () => useZoomItems(useGlobal, zoomItemTapHandler),
    [useGlobal, zoomItemTapHandler]
  )

  const optionStackPropsz = [
    {
      useTitle: useTuningTitleMemo,
      useItems: useTuningItemsMemo,
      twoColumns: false,
    },
    {
      useTitle: useValvingTitleMemo,
      useItems: useValvingItemsMemo,
      twoColumns: false,
    },
    {
      useTitle: useZoomTitleMemo,
      useItems: useZoomItemsMemo,
      twoColumns: false,
    },
  ]

  const { dynamicSizes } = useSizes()
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <MemoOptionStack optionPropsz={optionStackPropsz} />
      </MenuFace>
      <MenuAccessOpen {...menuProps}>
        <Entypo
          name="cog"
          size={dynamicSizes.labelIconSize}
          color={getColors().homeRowsColor}
        />
      </MenuAccessOpen>
    </Menu>
  )
}
