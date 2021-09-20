import 'react-native-gesture-handler'

import { useWindowDimensions } from 'use-dimensions'
import type { Dispatch } from 'reactn/default'
import { createProvider } from 'reactn'
import { withTimingTransition, useValue } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import type { HarpStrata } from 'harpstrata'

import { HarpGuruPage } from '../harp-guru-page'
import type { GlobalState, PageNumber } from '../../types'
import { getWindowDimensions } from '../../packages/get-window-dimensions'

import { getInitialGlobalState } from './utils'

const nextColumnBounds = (): Pick<GlobalState, 'columnBounds'> => {
  return {
    columnBounds: [0, 6],
  }
}
const newHarpStrata = (
  _global: GlobalState,
  dispatch: Dispatch,
  harpStrata: HarpStrata
): Pick<GlobalState, 'activeHarpStrata'> => {
  dispatch.nextColumnBounds()
  return {
    activeHarpStrata: harpStrata,
  }
}

const Provider1 = createProvider(getInitialGlobalState(1))
const Provider2 = createProvider(getInitialGlobalState(2))
const Provider3 = createProvider(getInitialGlobalState(3))
Provider1.addReducer('newHarpStrata', newHarpStrata)
Provider1.addReducer('newHarpStrata', nextColumnBounds)
Provider2.addReducer('newHarpStrata', newHarpStrata)
Provider2.addReducer('newHarpStrata', nextColumnBounds)
Provider3.addReducer('newHarpStrata', newHarpStrata)
Provider3.addReducer('newHarpStrata', nextColumnBounds)

export const HarpGuru = (): ReactElement => {
  useWindowDimensions()

  const pageInFrame = useValue<PageNumber>(1)

  const { shortEdge } = getWindowDimensions()

  const pageTransition = withTimingTransition(pageInFrame, {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  })
  const offscreen = shortEdge
  // The strange decimal stopoff on the way to the next integer
  // in each of these is to allow the animation to appear to
  // take the page just barely out of frame, but to then take
  // it a great distance away at the end. This means the animation
  // is as smooth as possible, but the page is well out of the
  // way in case any animated objects move outside of it's page
  // frame towards interferring with the next page.
  const page1Y = interpolate(pageTransition, {
    inputRange: [1, 1.9, 2, 3],
    outputRange: [0, offscreen, offscreen * 10, offscreen * 10],
  })
  const page2Y = interpolate(pageTransition, {
    inputRange: [1, 2, 2.9, 3],
    outputRange: [0, 0, offscreen, offscreen * 10],
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
