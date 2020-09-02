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

import { NoteDisplayFragment } from '../note-display-fragment'
import { getDisplayValueTuple } from '../../utils'
import type { Coord } from '../../types'

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

export const HarpCell = ({ yxCoord }: HarpCellProps): React.ReactElement => {
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const toggleHarpCell = useToggleHarpCell()
  const setPozitionRoot = useSetPozitionRoot()
  const { thisDegreeId, thisPitchId, thisIsActiveId } = usePositionAnalysis(
    yxCoord
  )
  const displayValue = getDisplayValueTuple(
    thisDegreeId,
    thisPitchId,
    activeDisplayMode
  )
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

  const contentFragment = (
    <NoteDisplayFragment
      displayValue={displayValue}
      isActive={thisIsActiveId === IsActiveIds.Active}
      splitType={'SLANT'}
    />
  )

  const accessibleContent = (
    <LongPressGestureHandler onHandlerStateChange={handleLongPressStateChange}>
      <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
        <View accessible={true} accessibilityRole="button" style={styles.cell}>
          {contentFragment}
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
