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
import type { DegreeIds, PitchIds } from 'harpstrata'

import { RenderedTone } from '../rendered-tone'
import { getRenderableToneTuples } from '../../utils'
import { Coord, DisplayModes } from '../../types'

import {
  useToggleHarpCell,
  useStyles,
  useSetPozitionRoot,
  usePositionAnalysis,
} from './hooks'

export type YXCoord = [Coord, Coord]

type HarpCellProps = {
  readonly yxCoord: YXCoord
}

const getToneSource = (
  degreeId: DegreeIds | undefined,
  pitchId: PitchIds | undefined,
  activeDisplayMode: DisplayModes
): DegreeIds | PitchIds | undefined => {
  if (degreeId === undefined && pitchId === undefined) return undefined
  if (activeDisplayMode === DisplayModes.Degree) return degreeId
  return pitchId
}

export const HarpCell = ({ yxCoord }: HarpCellProps): React.ReactElement => {
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const toggleHarpCell = useToggleHarpCell()
  const setPozitionRoot = useSetPozitionRoot()
  const { thisDegreeId, thisPitchId, thisIsActiveId } = usePositionAnalysis(
    yxCoord
  )
  const toneSource = getToneSource(thisDegreeId, thisPitchId, activeDisplayMode)
  const toneTuples = getRenderableToneTuples(toneSource)
  const styles = useStyles(yxCoord)

  const handleTapStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state !== State.END) return

    toggleHarpCell(thisDegreeId)
  }

  const handleLongPressStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state !== State.ACTIVE) return

    setPozitionRoot(thisPitchId)
  }

  const renderedTone = (
    <RenderedTone
      toneTuples={toneTuples}
      isActive={thisIsActiveId === IsActiveIds.Active}
      isQuestion={false}
      splitType={'SLANT'}
      activeExperienceMode={activeExperienceMode}
    />
  )

  const accessibleContent = (
    <LongPressGestureHandler
      onHandlerStateChange={handleLongPressStateChange}
      minDurationMs={500}
    >
      <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
        <View accessible={true} accessibilityRole="button" style={styles.cell}>
          {renderedTone}
        </View>
      </TapGestureHandler>
    </LongPressGestureHandler>
  )

  const inAccessibleContent = (
    <View accessible={false} style={styles.cell}>
      <View style={styles.cell} />
    </View>
  )

  const content =
    thisDegreeId === undefined ? inAccessibleContent : accessibleContent

  return content
}
