import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
  LongPressGestureHandler,
} from 'react-native-gesture-handler'
import { Text, View } from 'react-native'
import type { TextStyle, ViewStyle } from 'react-native'
import React from 'react'

import type { Coord } from '../../types'

import {
  useToggleHarpCell,
  useStyles,
  useSetPozitionRoot,
  usePositionAnalysis,
  useDisplayValue,
} from './hooks'

export type YXCoord = [Coord, Coord]

export type HarpCellStyles = {
  readonly cell: ViewStyle
  readonly contentsWrapper: ViewStyle
  readonly note: TextStyle
  readonly modifier: TextStyle
}

type HarpCellProps = {
  readonly yxCoord: YXCoord
}

export const HarpCell = ({ yxCoord }: HarpCellProps): React.ReactElement => {
  const toggleHarpCell = useToggleHarpCell()
  const setPozitionRoot = useSetPozitionRoot()
  const { thisDegreeId, thisPitchId } = usePositionAnalysis(yxCoord)
  const displayValue = useDisplayValue(yxCoord)
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

  const accessibleContent = (
    <LongPressGestureHandler onHandlerStateChange={handleLongPressStateChange}>
      <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
        <View accessible={true} accessibilityRole="button" style={styles.cell}>
          <View style={styles.contentsWrapper}>
            <Text style={styles.note}>{displayValue[0]}</Text>
          </View>
          <View style={styles.contentsWrapper}>
            <Text style={styles.modifier}>{displayValue[1]}</Text>
          </View>
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
