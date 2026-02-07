import React, { useCallback } from 'react'
import type { TuningIds, ValvingIds, HarpFaceMatrix, Degree } from 'harpparts'
import { Entypo } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuFace } from '../menu-face'
import { MenuAccessOpen } from '../menu-access-open'
import { Menu } from '../menu'
import { getColors } from '../../utils'
import type { MenuProps, DisplayModes, ZoomIds } from '../../types'
import { useHarpGuruStore, useHarpGuruStoreInstance } from '../../store'

import {
  reduceZoomIdToColumnBounds,
  reduceTuningIdToHarpStrata,
  reduceValvingIdToHarpStrata,
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
  const store = useHarpGuruStoreInstance()
  const useTuningTitleMemo = useCallback(() => useTuningTitle(), [])
  const tuningItemTapHandler = useCallback(
    (activeDisplayMode: DisplayModes, tuningId: TuningIds) => {
      store.setState((state) => ({
        activeHarpStrata: reduceTuningIdToHarpStrata(
          state.activeHarpStrata,
          activeDisplayMode,
          tuningId
        ),
      }))
    },
    [store]
  )
  const useTuningItemsMemo = useCallback(
    () => useTuningItems(tuningItemTapHandler),
    [tuningItemTapHandler]
  )

  const useValvingTitleMemo = useCallback(() => useValvingTitle(), [])
  const valvingItemTapHandler = useCallback(
    (activeDisplayMode: DisplayModes, valvingId: ValvingIds) => {
      store.setState((state) => ({
        activeHarpStrata: reduceValvingIdToHarpStrata(
          state.activeHarpStrata,
          activeDisplayMode,
          valvingId
        ),
      }))
    },
    [store]
  )
  const useValvingItemsMemo = useCallback(
    () => useValvingItems(valvingItemTapHandler),
    [valvingItemTapHandler]
  )

  const useZoomTitleMemo = useCallback(() => useZoomTitle(), [])
  const zoomItemTapHandler = useCallback(
    (activeDegreeMatrix: HarpFaceMatrix<Degree>, zoomId: ZoomIds) => {
      store.setState((state) => ({
        sourceColumnBounds: reduceZoomIdToColumnBounds(
          state.sourceColumnBounds,
          activeDegreeMatrix,
          zoomId
        ),
      }))
    },
    // TODO: This and a great many other things should be based on the
    // interaction matrix of the apparatus rather than the degreeMatrix
    // which is much more volatile
    [store]
  )
  const useZoomItemsMemo = useCallback(
    () => useZoomItems(zoomItemTapHandler),
    [zoomItemTapHandler]
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

  const dynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)
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
