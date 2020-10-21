import { useGlobal } from 'reactn'
import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
  LongPressGestureHandler,
} from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import { IsActiveIds, DegreeIds } from 'harpstrata'

import { MemoHarpCellInaccessible } from '../harp-cell-inaccessible'
import { MemoHarpCellAccessible } from '../harp-cell-accessible'
import type { Coord } from '../../types'

import { getBaseHarpCellStyles } from './utils'
import {
  useSetPozitionRoot,
  usePositionAnalysis,
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

  if (thisDegreeId === undefined || thisPitchId === undefined)
    return <MemoHarpCellInaccessible baseStyles={baseHarpCellStyles} />

  const setPozitionRoot = useSetPozitionRoot()
  const handleLongPressStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state !== State.ACTIVE) return

    setPozitionRoot(thisPitchId)
  }

  const [activeDegreeIdBuffer, setActiveDegreeIdBuffer] = useGlobal('activeDegreeIdBuffer')
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const toggleHarpCell = (degreeId: DegreeIds) => {
    const { isActiveComplex: { activeDegreeIds } } = activeHarpStrata
    if (!activeDegreeIds.includes(degreeId)) {
      if (activeDegreeIdBuffer.includes(degreeId)) return
      setActiveDegreeIdBuffer([ ...activeDegreeIdBuffer, degreeId ])
    } else {
      if (!activeDegreeIdBuffer.includes(degreeId)) return
      const index = activeDegreeIdBuffer.indexOf(degreeId)
      setActiveDegreeIdBuffer([...activeDegreeIdBuffer.slice(0, index), ...activeDegreeIdBuffer.slice(index + 1)])
    }
  }
  const handleTapStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state === State.BEGAN) {
      setIsTouched(true)
    }
    if (nativeEvent.state !== State.END) return

    toggleHarpCell(thisDegreeId)
  }

  const [isTouched, setIsTouched] = React.useState(false)
  React.useEffect(() => {
    const hideQuestionTimer = setTimeout(() => {
      setIsTouched(false)
    }, 300)
    return () => {
      clearTimeout(hideQuestionTimer)
    }
  }, [isTouched])

  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
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
