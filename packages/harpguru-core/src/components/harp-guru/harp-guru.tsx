import 'react-native-gesture-handler'

import { createProvider } from 'reactn'
import { withTimingTransition, useValue } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { HarpGuruPage } from '../harp-guru-page'
import { getWindowDimensions } from '../../utils'
import { PageNumber } from '../../types'

import { getInitialGlobalState } from './utils'

const Provider1 = createProvider(getInitialGlobalState(1))
const Provider2 = createProvider(getInitialGlobalState(2))
const Provider3 = createProvider(getInitialGlobalState(3))

export const HarpGuru = (): ReactElement => {
  const pageInFrame = useValue<PageNumber>(1)

  const { shortEdge } = getWindowDimensions()

  const pageTransition = withTimingTransition(pageInFrame, {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  })
  const offscreen = shortEdge
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
          <HarpGuruPage pageOnDisplay={pageInFrame} thisPage={3} />
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
          <HarpGuruPage pageOnDisplay={pageInFrame} thisPage={2} />
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
          <HarpGuruPage pageOnDisplay={pageInFrame} thisPage={1} />
        </Animated.View>
      </Provider1>
    </>
  )
}
