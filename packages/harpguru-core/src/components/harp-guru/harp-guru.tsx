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
  const pageInFrame = useValue<0 | 1 | 2>(0)

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceShortSide =
    windowWidth < windowHeight ? windowWidth : windowHeight

  const pageTransition = withTimingTransition(pageInFrame, {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  })
  const offscreen = deviceShortSide * -2
  const page0Y = interpolate(pageTransition, {
    inputRange: [0, 1, 2],
    outputRange: [0, offscreen, offscreen],
  })
  const page1Y = interpolate(pageTransition, {
    inputRange: [0, 1, 2],
    outputRange: [offscreen, 0, offscreen],
  })
  const page2Y = interpolate(pageTransition, {
    inputRange: [0, 1, 2],
    outputRange: [offscreen, offscreen, 0],
  })

  return (
    <>
      <Provider1>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            {
              transform: [{ translateY: page0Y }],
            },
          ]}
        >
          <HarpGuruPage pageInFrame={pageInFrame} nextPage={1} />
        </Animated.View>
      </Provider1>
      <Provider2>
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
      </Provider2>
      <Provider3>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            {
              transform: [{ translateY: page2Y }],
            },
          ]}
        >
          <HarpGuruPage pageInFrame={pageInFrame} nextPage={0} />
        </Animated.View>
      </Provider3>
    </>
  )
}
