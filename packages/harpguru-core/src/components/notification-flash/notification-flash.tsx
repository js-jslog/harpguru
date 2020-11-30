import { useTimingTransition } from 'react-native-redash'
import Animated, {
  greaterThan,
  cond,
  interpolate,
  Easing,
} from 'react-native-reanimated'
import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { ChildrenProps } from '../../types'
import { colors } from '../../styles'
import { overlayOpacity } from '../../constants'

type NotificationFlashProps = ChildrenProps & {
  readonly shouldDisplay: boolean
}

export const NotificationFlash = ({
  shouldDisplay,
  children,
}: NotificationFlashProps): ReactElement => {
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
  const explosiveOpacity = shouldDisplay
    ? interpolate(flashAnimationValue, {
      inputRange: [0, 1],
      outputRange: [overlayOpacity, 0],
    })
    : interpolate(flashAnimationValue, {
      inputRange: [0, 1],
      outputRange: [0, 0],
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
    overlay2: {
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
    },
  })

  return (
    <>
      <Animated.View
        style={[
          styles.animated,
          {
            transform: [{ translateX: translateX }],
            opacity: explosiveOpacity,
          },
        ]}
      >
        <View style={styles.overlay2} />
      </Animated.View>
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
                {children}
              </Animated.View>
            </View>
          </View>
        </View>
      </Animated.View>
    </>
  )
}
