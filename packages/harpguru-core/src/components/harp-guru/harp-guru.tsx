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

export const HarpGuru = (): ReactElement => {
  const pageInFrame = useValue<0 | 1>(0)

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceShortSide =
    windowWidth < windowHeight ? windowWidth : windowHeight

  const pageTransition = withTimingTransition(pageInFrame, {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  })
  const page0Y = interpolate(pageTransition, {
    inputRange: [0, 1],
    outputRange: [0, deviceShortSide * -2],
  })
  const page1Y = interpolate(pageTransition, {
    inputRange: [0, 1],
    outputRange: [deviceShortSide * -2, 0],
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
          <HarpGuruPage pageInFrame={pageInFrame} otherPage={1} />
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
          <HarpGuruPage pageInFrame={pageInFrame} otherPage={0} />
        </Animated.View>
      </Provider2>
    </>
  )
}
