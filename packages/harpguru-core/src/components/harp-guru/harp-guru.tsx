import { useWindowDimensions } from 'use-dimensions'
import { createProvider } from 'reactn'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { HarpGuruPage } from '../harp-guru-page'
import type { PageNumber } from '../../types'
import { getWindowDimensions } from '../../packages/get-window-dimensions'

import { getInitialGlobalState } from './utils'

const Provider1 = createProvider(getInitialGlobalState(1))
const Provider2 = createProvider(getInitialGlobalState(2))

export const HarpGuru = (): ReactElement => {
  useWindowDimensions()

  const { shortEdge: offScreen } = getWindowDimensions()

  const pageOnDisplay = useSharedValue<PageNumber>(1)
  const pageDropTimingValue = useDerivedValue(() =>
    withTiming(pageOnDisplay.value)
  )
  const page1YAnimationStyle = useAnimatedStyle(() => {
    // The strange decimal stopoff on the way to the next integer
    // in each of these is to allow the animation to appear to
    // take the page just barely out of frame, but to then take
    // it a great distance away at the end. This means the animation
    // is as smooth as possible, but the page is well out of the
    // way in case any animated objects move outside of it's page
    // frame towards interferring with the next page.
    const translateY = interpolate(
      pageDropTimingValue.value,
      [1, 1.9, 2],
      [0, offScreen, offScreen * 10]
    )
    return { transform: [{ translateY }] }
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <>
        <Provider2>
          <Animated.View style={[{ ...StyleSheet.absoluteFillObject }]}>
            <HarpGuruPage pageOnDisplay={pageOnDisplay} thisPage={2} />
          </Animated.View>
        </Provider2>
        <Provider1>
          <Animated.View
            style={[{ ...StyleSheet.absoluteFillObject }, page1YAnimationStyle]}
          >
            <HarpGuruPage pageOnDisplay={pageOnDisplay} thisPage={1} />
          </Animated.View>
        </Provider1>
      </>
    </GestureHandlerRootView>
  )
}
