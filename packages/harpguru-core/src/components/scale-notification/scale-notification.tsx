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

import { getSizes, colors } from '../../styles'
import { usePrevious } from '../../hooks'
import { overlayOpacity } from '../../constants'

import { doScalesMatch } from './utils'

export const ScaleNotification = (): ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { activeDegreeIds } = activeHarpStrata
  const previousActiveDegreeIds = usePrevious(activeDegreeIds, activeDegreeIds)

  const [shouldDisplay, setShouldDisplay] = useState(false)

  const isNewScale =
    previousActiveDegreeIds === undefined
      ? false
      : !doScalesMatch(activeDegreeIds, previousActiveDegreeIds)

  useEffect(() => {
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
  }, [isNewScale, shouldDisplay])

  //const scaleName = getScaleName(activeDegreeIds)

  const flashAnimationValue = useTimingTransition(shouldDisplay, {
    duration: 200,
    easing: Easing.inOut(Easing.ease),
  })

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const guaranteeOffScreenWidth =
    windowWidth > windowHeight ? windowWidth : windowHeight
  const displayOpacity = interpolate(flashAnimationValue, {
    inputRange: [0, 1],
    outputRange: [0, overlayOpacity],
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
      backgroundColor: colors.pageColor,
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
      transform: [{ scale: sizes['5'] }],
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
            <Text>{isNewScale.toString()}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  )
}
