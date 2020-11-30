import { useGlobal, useState } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import Animated, {
  greaterThan,
  cond,
  interpolate,
  Easing,
} from 'react-native-reanimated'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import type { ReactElement } from 'react'

import { getSizes } from '../../styles'
import { usePrevious } from '../../hooks'
import { overlayOpacity } from '../../constants'

import { doScalesMatch, getScaleLabel } from './utils'

export const ScaleNotification = (): ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { activeDegreeIds } = activeHarpStrata
  const previousActiveDegreeIds = usePrevious(activeDegreeIds, activeDegreeIds)

  const [shouldDisplay, setShouldDisplay] = useState(false)

  const isNewScale =
    previousActiveDegreeIds === undefined
      ? false
      : !doScalesMatch(activeDegreeIds, previousActiveDegreeIds)

  const scaleLabel = getScaleLabel(activeDegreeIds)

  useEffect(() => {
    if (scaleLabel === undefined) return
    if (isNewScale === true) {
      setShouldDisplay(true)
      const finishShowing = setTimeout(() => {
        setShouldDisplay(false)
      }, 500)
      return () => clearTimeout(finishShowing)
    }
    if (isNewScale === false && shouldDisplay === true) {
      const finishShowing = setTimeout(() => {
        setShouldDisplay(false)
      }, 500)
      return () => clearTimeout(finishShowing)
    }
    return
  }, [isNewScale, scaleLabel, shouldDisplay])

  const flashAnimationValue = useTimingTransition(shouldDisplay, {
    duration: 500,
    easing: Easing.inOut(Easing.ease),
  })

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const guaranteeOffScreenWidth =
    windowWidth > windowHeight ? windowWidth : windowHeight
  const displayOpacity = interpolate(flashAnimationValue, {
    inputRange: [0, 1],
    outputRange: [0, overlayOpacity],
  })
  const messageScale = shouldDisplay
    ? interpolate(flashAnimationValue, {
      inputRange: [0, 1],
      outputRange: [1, 2],
    })
    : interpolate(flashAnimationValue, {
      inputRange: [0, 1],
      outputRange: [3, 2],
    })
  const translateX = cond(
    greaterThan(flashAnimationValue, 0),
    0,
    guaranteeOffScreenWidth
  )
  const sizes = getSizes()
  const styles = StyleSheet.create({
    animated: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      backgroundColor: '#efcded',
    },
    mainContents: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
    },
    message: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      transform: [{ scale: sizes['3'] }],
    },
  })

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          transform: [{ translateX: translateX }],
          opacity: displayOpacity,
        },
      ]}
    >
      <View style={styles.overlay}>
        <View style={styles.mainContents}>
          <View style={styles.message}>
            <Animated.View style={[{ transform: [{ scale: messageScale }] }]}>
              <Text
                style={{
                  color: 'black',
                  textShadowColor: 'white',
                  textShadowRadius: 1,
                }}
              >
                {scaleLabel}
              </Text>
            </Animated.View>
          </View>
        </View>
      </View>
    </Animated.View>
  )
}
