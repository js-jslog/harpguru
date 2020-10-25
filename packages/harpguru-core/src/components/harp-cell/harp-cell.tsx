import { useGlobal } from 'reactn'
import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
  LongPressGestureHandler,
} from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'

import { MemoHarpCellInaccessible } from '../harp-cell-inaccessible'
import { MemoHarpCellAccessible } from '../harp-cell-accessible'

import { getBaseHarpCellStyles } from './utils'
import {
  useSetPozitionRoot,
  usePositionAnalysis,
  useTapRerenderLogic,
} from './hooks'

import type { YXCoord } from './types'

type HarpCellProps = {
  readonly yxCoord: YXCoord
}

export const HarpCell = ({ yxCoord }: HarpCellProps): React.ReactElement => {
  const { thisDegreeId, thisPitchId, thisIsActiveId } = usePositionAnalysis(
    yxCoord
  )
  const baseHarpCellStyles = getBaseHarpCellStyles()
  const setPozitionRoot = useSetPozitionRoot()
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const [cellState, tapHandler] = useTapRerenderLogic(
    thisDegreeId,
    thisIsActiveId
  )

  if (thisDegreeId === undefined || thisPitchId === undefined)
    return <MemoHarpCellInaccessible baseStyles={baseHarpCellStyles} />

  const handleLongPressStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state !== State.ACTIVE) return

    setPozitionRoot(thisPitchId)
  }

  const handleTapStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    tapHandler(nativeEvent)
  }

  const harpCellAccessibleProps = {
    degreeId: thisDegreeId,
    pitchId: thisPitchId,
    displayMode: activeDisplayMode,
    activeExperienceMode: activeExperienceMode,
    cellState,
    baseStyles: baseHarpCellStyles,
  }

  return (
    <LongPressGestureHandler
      onHandlerStateChange={handleLongPressStateChange}
      minDurationMs={1000}
    >
      <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
        <View>
          <MemoHarpCellAccessible {...harpCellAccessibleProps} />
        </View>
      </TapGestureHandler>
    </LongPressGestureHandler>
  )
}
