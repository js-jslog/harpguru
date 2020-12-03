import 'react-native-gesture-handler'

import { createProvider } from 'reactn'
import { withTimingTransition, useValue } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { HarpGuruPage } from '../harp-guru-page'

import { getInitialGlobalState } from './utils'

const initialGlobalState = getInitialGlobalState()
const Provider1 = createProvider(initialGlobalState)
const Provider2 = createProvider(initialGlobalState)
const Provider3 = createProvider(initialGlobalState)

export const HarpGuru = (): ReactElement => {
  const pageInFrame = useValue<1 | 2 | 3>(1)

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceShortSide =
    windowWidth < windowHeight ? windowWidth : windowHeight

  const pageTransition = withTimingTransition(pageInFrame, {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  })
  const offscreen = deviceShortSide
  const page1Y = interpolate(pageTransition, {
    inputRange: [1, 2, 3],
    outputRange: [0, offscreen, offscreen],
  })
  const page2Y = interpolate(pageTransition, {
    inputRange: [1, 2, 3],
    outputRange: [0, 0, offscreen],
  })
  const page3Y = interpolate(pageTransition, {
    inputRange: [1, 2, 3],
    outputRange: [0, 0, 0],
  })

  return (
    <>
      <Provider3>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            {
              transform: [{ translateY: page3Y }],
            },
          ]}
        >
          <HarpGuruPage pageInFrame={pageInFrame} nextPage={1} />
        </Animated.View>
      </Provider3>
      <Provider2>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            {
              transform: [{ translateY: page2Y }],
            },
          ]}
        >
          <HarpGuruPage pageInFrame={pageInFrame} nextPage={3} />
        </Animated.View>
      </Provider2>
      <Provider1>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            {
              transform: [{ translateY: page1Y }],
            },
          ]}
        >
          <HarpGuruPage pageInFrame={pageInFrame} nextPage={2} />
        </Animated.View>
      </Provider1>
    </>
  )
}
