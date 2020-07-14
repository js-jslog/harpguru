import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler'
import { View } from 'react-native'
import React, { useState } from 'react'

import type { OptionContainerProps } from '../types'
import { styles, getDynamicStyles } from '../../../styles'
import { usePrevious } from '../../../../helpers'
import { themeSizes } from '../../../../Theme'

import { Title, Option } from './OptionContents'

const { 8: swipeThreshold } = themeSizes

export const OptionContainer = (
  props: OptionContainerProps
): React.ReactElement => {
  const [state, setState] = useState(State.UNDETERMINED)
  const [translationY, setTranslationY] = useState(0)
  const previousState = usePrevious(state, State.UNDETERMINED)

  const { title, optionId, nudgeFunction } = props

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

  return (
    <PanGestureHandler
      shouldCancelWhenOutside={true}
      activeOffsetY={[swipeThreshold * -1, swipeThreshold]}
      onHandlerStateChange={handlePozitionSwipe}
    >
      <View style={[styles.optionContainer, dynamicStyles.activeSwipeStyle]}>
        <Title>{title}</Title>
        <Option>{optionId}</Option>
      </View>
    </PanGestureHandler>
  )
}
