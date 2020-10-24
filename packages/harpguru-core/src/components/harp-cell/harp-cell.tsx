import { useGlobal } from 'reactn'
import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
  LongPressGestureHandler,
} from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import { IsActiveIds } from 'harpstrata'

import { MemoHarpCellInaccessible } from '../harp-cell-inaccessible'
import { MemoHarpCellAccessible } from '../harp-cell-accessible'
import type { Coord } from '../../types'

import { getBaseHarpCellStyles } from './utils'
import {
  useSetPozitionRoot,
  usePositionAnalysis,
  useAddBufferedActivityToggle,
} from './hooks'

export type YXCoord = [Coord, Coord]

type HarpCellProps = {
  readonly yxCoord: YXCoord
}

export const HarpCell = ({ yxCoord }: HarpCellProps): React.ReactElement => {
  const { thisDegreeId, thisPitchId, thisIsActiveId } = usePositionAnalysis(
    yxCoord
  )
  const baseHarpCellStyles = getBaseHarpCellStyles()
  const setPozitionRoot = useSetPozitionRoot()
  const addBufferedActivityToggle = useAddBufferedActivityToggle()
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const [isTouched, setIsTouched] = React.useState(false)
  React.useEffect(() => {
    const unTouchCell = setTimeout(() => {
      setIsTouched(false)
    }, 100)
    return () => {
      clearTimeout(unTouchCell)
    }
  }, [isTouched])

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
    if (nativeEvent.state === State.BEGAN) {
      setIsTouched(true)
    }
    if (nativeEvent.state !== State.END) return

    addBufferedActivityToggle(thisDegreeId)
  }

  const harpCellAccessibleProps = {
    degreeId: thisDegreeId,
    pitchId: thisPitchId,
    isActive: thisIsActiveId === IsActiveIds.Active,
    displayMode: activeDisplayMode,
    activeExperienceMode: activeExperienceMode,
    baseStyles: baseHarpCellStyles,
    isTouched,
  }

  return (
    <LongPressGestureHandler
      onHandlerStateChange={handleLongPressStateChange}
      minDurationMs={500}
    >
      <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
        <View>
          <MemoHarpCellAccessible {...harpCellAccessibleProps} />
        </View>
      </TapGestureHandler>
    </LongPressGestureHandler>
  )
}
