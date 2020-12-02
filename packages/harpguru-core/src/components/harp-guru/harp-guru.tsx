import 'react-native-gesture-handler'

import { createProvider } from 'reactn'
import { withTimingTransition, useValue } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { HarpGuruPage } from '../harp-guru-page'

import { getInitialGlobalState } from './utils'

const initialGlobalState = getInitialGlobalState()
const Provider1 = createProvider(initialGlobalState)
const Provider2 = createProvider(initialGlobalState)

export const HarpGuru = (): ReactElement => {
  const pageInFrame = useValue<0 | 1>(0)

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceLongSide = windowWidth > windowHeight ? windowWidth : windowHeight

  const pageTransition = withTimingTransition(pageInFrame, {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  })
  const page0X = interpolate(pageTransition, {
    inputRange: [0, 1],
    outputRange: [0, deviceLongSide * 2],
  })
  const page1X = interpolate(pageTransition, {
    inputRange: [0, 1],
    outputRange: [deviceLongSide * 2, 0],
  })

  const handleTapStateChange = () => {
    pageInFrame.setValue(1)
  }

  return (
    <>
      <Provider1>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            {
              transform: [{ translateX: page0X }],
            },
          ]}
        >
          <HarpGuruPage />
        </Animated.View>
      </Provider1>
      <Provider2>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            {
              transform: [{ translateX: page1X }],
            },
          ]}
        >
          <HarpGuruPage />
        </Animated.View>
      </Provider2>
      <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
        <View style={{ height: 100, width: 100, backgroundColor: 'black' }} />
      </TapGestureHandler>
    </>
  )
}
