import Animated from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import React from 'react'

import { MemoHarpCellInaccessible } from '../harp-cell-inaccessible'
import { MemoHarpCellAccessible } from '../harp-cell-accessible'
import { useHarpGuruStore } from '../../store'

import { getBaseHarpCellStyles } from './utils'
import { usePositionAnalysis, useTapRerenderLogic } from './hooks'

import type { YXCoord } from './types'

type HarpCellProps = {
  readonly yxCoord: YXCoord
  readonly harpfaceIndex: 'harpface1' | 'harpface2'
}

export const HarpCell = ({
  yxCoord,
  harpfaceIndex,
}: HarpCellProps): React.ReactElement => {
  const { thisDegreeId, thisPitchId, thisIsActive } = usePositionAnalysis(
    yxCoord,
    harpfaceIndex
  )
  const baseHarpCellStyles = getBaseHarpCellStyles()
  const activeDisplayMode = useHarpGuruStore((state) => state.activeDisplayMode)
  const activeExperienceMode = useHarpGuruStore((state) => state.activeExperienceMode)
  const [cellState, gestureHandler] = useTapRerenderLogic(
    thisDegreeId,
    thisIsActive
  )

  if (thisDegreeId === undefined || thisPitchId === undefined)
    return <MemoHarpCellInaccessible baseStyles={baseHarpCellStyles} />

  const harpCellAccessibleProps = {
    degreeId: thisDegreeId,
    pitchId: thisPitchId,
    displayMode: activeDisplayMode,
    activeExperienceMode: activeExperienceMode,
    cellState,
    baseStyles: baseHarpCellStyles,
  }

  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View>
        <MemoHarpCellAccessible {...harpCellAccessibleProps} />
      </Animated.View>
    </TapGestureHandler>
  )
}
