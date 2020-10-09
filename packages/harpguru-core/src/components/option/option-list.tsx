import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import {
  PanGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler'
import type {
  PanGestureHandlerGestureEvent,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { OptionIds } from '../../types'
import { getSizes } from '../../styles'
import { usePrevious } from '../../hooks'

import { getStyles, getDynamicStyles } from './option-styles'

type OptionProps = {
  readonly title: string
  readonly activeOptionId: OptionIds
  readonly orderedOptionIds: ReadonlyArray<OptionIds>
  readonly nudgeFunction: (arg0: 'UP' | 'DOWN') => void
  readonly setFunction: (arg0: OptionIds) => void
}

export const OptionList = (props: OptionProps): React.ReactElement => {
  const [state, setState] = useState(State.UNDETERMINED)
  const [translationY, setTranslationY] = useState(0)
  const previousState = usePrevious(state, State.UNDETERMINED)
  const styles = getStyles()
  const sizes = getSizes()
  const { 8: swipeThreshold } = sizes

  const { title, activeOptionId, orderedOptionIds, nudgeFunction, setFunction } = props

  const dynamicStyles = getDynamicStyles(state)

  if (state === State.END && previousState === State.ACTIVE) {
    if (translationY > 0) {
      nudgeFunction('UP')
    } else {
      nudgeFunction('DOWN')
    }
  }

  const handlePozitionSwipe = ({
    nativeEvent,
  }: PanGestureHandlerGestureEvent) => {
    setState(nativeEvent.state)
    setTranslationY(nativeEvent.translationY)
  }

  const previousOptionId = usePrevious(activeOptionId, undefined)
  const isUpdated = activeOptionId !== previousOptionId
  const optionUpdatedVal = useTimingTransition(isUpdated, {
    duration: 300,
    easing: Easing.inOut(Easing.circle),
  })
  const optionUpdateTransition = interpolate(optionUpdatedVal, {
    inputRange: [0, 1],
    outputRange: isUpdated ? [2, 1] : [1, 1],
  })

  const activeIdPos = orderedOptionIds.indexOf(activeOptionId)
  const { length: listLength } = orderedOptionIds

  const extendedList = [...orderedOptionIds, ...orderedOptionIds, ...orderedOptionIds]
  const innerActiveIdPos = activeIdPos + listLength

  const {[innerActiveIdPos -2]: inactiveOptionId4} = extendedList
  const {[innerActiveIdPos -1]: inactiveOptionId3} = extendedList
  const {[innerActiveIdPos +1]: inactiveOptionId2} = extendedList
  const {[innerActiveIdPos +2]: inactiveOptionId1} = extendedList

  return (
    <PanGestureHandler
      shouldCancelWhenOutside={true}
      activeOffsetY={[swipeThreshold * -1, swipeThreshold]}
      onHandlerStateChange={handlePozitionSwipe}
    >
      <View style={[styles.option, dynamicStyles.activeSwipeStyle]}>
        <OptionTitle>{title}</OptionTitle>
        <View>
          <InactiveOptionValue id={inactiveOptionId1} setFunction={setFunction} />
          <InactiveOptionValue id={inactiveOptionId2} setFunction={setFunction} />
          <Animated.View
            style={[
              {
                transform: [{ scale: optionUpdateTransition }],
              },
            ]}
          >
            <ActiveOptionValue id={activeOptionId} setFunction={setFunction} />
          </Animated.View>
          <InactiveOptionValue id={inactiveOptionId3} setFunction={setFunction} />
          <InactiveOptionValue id={inactiveOptionId4} setFunction={setFunction} />
        </View>
      </View>
    </PanGestureHandler>
  )
}

type ChildProps = {
  readonly children: React.ReactNode
}
type IdProps = {
  readonly id: OptionIds
  readonly setFunction: (arg0: OptionIds) => void
}

const OptionTitle = ({ children }: ChildProps): React.ReactElement => {
  const styles = getStyles()
  return <Text style={styles.optionTitle}>{children}</Text>
}
const InactiveOptionValue = ({ id, setFunction }: IdProps): React.ReactElement => {
  const styles = getStyles()
  const handleTapStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state !== State.END) return

    setFunction(id)
  }
  return (
    <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
      <View>
        <Text style={styles.inactiveOptionValue}>{id}</Text>
      </View>
    </TapGestureHandler>
  )
}
const ActiveOptionValue = ({ id }: IdProps): React.ReactElement => {
  const styles = getStyles()
  return <Text style={styles.activeOptionValue}>{id}</Text>
}
