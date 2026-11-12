import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useRef } from 'react'
import type { ReactElement } from 'react'

import { OpenIncomingSetupLink } from '../open-incoming-setup-link'
import { HarpGuruPage } from '../harp-guru-page'
import type { PageNumber } from '../../types'
import { createHarpGuruStore, StoreProvider } from '../../store'
import type { HarpGuruStoreInstance } from '../../store'
import { getWindowDimensions } from '../../packages/get-window-dimensions'

const pageNumbers: ReadonlyArray<PageNumber> = [1, 2]

export const HarpGuru = (): ReactElement => {
  useWindowDimensions()

  const { shortEdge: offScreen } = getWindowDimensions()

  // Made here rather than in each provider, so a setup link can be handed to
  // whichever harp face the user picks
  const storesRef = useRef<Record<PageNumber, HarpGuruStoreInstance> | null>(
    null
  )
  if (storesRef.current === null) {
    storesRef.current = {
      1: createHarpGuruStore(1),
      2: createHarpGuruStore(2),
    }
  }
  const { current: stores } = storesRef

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
        <StoreProvider pageNumber={2} store={stores[2]}>
          <Animated.View style={[{ ...StyleSheet.absoluteFill }]}>
            <HarpGuruPage pageOnDisplay={pageOnDisplay} thisPage={2} />
          </Animated.View>
        </StoreProvider>
        <StoreProvider pageNumber={1} store={stores[1]}>
          <Animated.View
            style={[{ ...StyleSheet.absoluteFill }, page1YAnimationStyle]}
          >
            <HarpGuruPage pageOnDisplay={pageOnDisplay} thisPage={1} />
          </Animated.View>
        </StoreProvider>
        <OpenIncomingSetupLink
          harpFaceStores={pageNumbers.map((pageNumber) => stores[pageNumber])}
          /* eslint-disable-next-line prefer-destructuring */
          showHarpFace={(index) => (pageOnDisplay.value = pageNumbers[index])}
        />
      </>
    </GestureHandlerRootView>
  )
}
