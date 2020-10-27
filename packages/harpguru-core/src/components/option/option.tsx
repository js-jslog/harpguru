import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { OptionValue } from '../option-value'
import { OptionIds } from '../../types'
import { getSizes } from '../../styles'
import { usePrevious } from '../../hooks'

import { putActiveOptionThird } from './utils'
import { getStyles, getDynamicStyles } from './option-styles'

type OptionProps = {
  readonly title: string
  readonly activeOptionId: OptionIds
  readonly orderedOptionIds: ReadonlyArray<OptionIds>
  readonly nudgeFunction: (arg0: 'UP' | 'DOWN') => void
  readonly setFunction: (arg0: OptionIds) => void
}

type TitleProps = {
  readonly children: React.ReactNode
}

const OptionTitle = ({ children }: TitleProps): React.ReactElement => {
  const styles = getStyles()
  return <Text style={styles.optionTitle}>{children}</Text>
}

type OptionDisplayList = [
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined
]
const selectFiveOptions = (
  orderedOptionIds: ReadonlyArray<OptionIds>
): OptionDisplayList => {
  if (orderedOptionIds.length === 2) {
    const arrayToFill = [0, 0, 0, 0, 0, 0]
    const retVal = arrayToFill.map((_element, index) => {
      if (orderedOptionIds[index]) return orderedOptionIds[index]
      return undefined
    }) as OptionDisplayList

    return [...retVal.slice(4), ...retVal.slice(0, 4)] as OptionDisplayList
  }
  return orderedOptionIds.slice(0, 6) as OptionDisplayList
}

export const Option = (props: OptionProps): React.ReactElement => {
  const [state, setState] = useState(State.UNDETERMINED)
  const [translationY, setTranslationY] = useState(0)
  const previousState = usePrevious(state, State.UNDETERMINED)
  const styles = getStyles()
  const sizes = getSizes()
  const { 8: swipeThreshold } = sizes

  const {
    title,
    activeOptionId,
    orderedOptionIds,
    nudgeFunction,
    setFunction,
  } = props

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

  const activeThirdOrderedList = putActiveOptionThird(orderedOptionIds, activeOptionId)

  const visibleOptionList = selectFiveOptions(activeThirdOrderedList)

  return (
    <PanGestureHandler
      shouldCancelWhenOutside={true}
      activeOffsetY={[swipeThreshold * -1, swipeThreshold]}
      onHandlerStateChange={handlePozitionSwipe}
    >
      <View style={[styles.option, dynamicStyles.activeSwipeStyle]}>
        <OptionTitle>{title}</OptionTitle>
        <View style={styles.optionValues}>
          <OptionValue
            id={visibleOptionList[0]}
            isActive={false}
            setFunction={setFunction}
            style={styles.distantOptionValue}
          />
          <OptionValue
            id={visibleOptionList[1]}
            isActive={false}
            setFunction={setFunction}
            style={styles.nextOptionValue}
          />
          <Animated.View
            style={[
              {
                transform: [{ scale: optionUpdateTransition }],
              },
            ]}
          >
            <OptionValue
              id={visibleOptionList[2]}
              isActive={true}
              setFunction={setFunction}
              style={styles.activeOptionValue}
            />
          </Animated.View>
          <OptionValue
            id={visibleOptionList[3]}
            isActive={false}
            setFunction={setFunction}
            style={styles.nextOptionValue}
          />
          <OptionValue
            id={visibleOptionList[4]}
            isActive={false}
            setFunction={setFunction}
            style={styles.distantOptionValue}
          />
          <OptionValue
            id={visibleOptionList[5]}
            isActive={false}
            setFunction={setFunction}
            style={styles.distantOptionValue}
          />
        </View>
      </View>
    </PanGestureHandler>
  )
}
