import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { getColors } from '../../utils'
import { ChildrenProps } from '../../types'

import { useFlashAnimationValues } from './hooks'

type NotificationFlashProps = ChildrenProps & {
  readonly shouldDisplay: boolean
}

export const NotificationFlash = ({
  shouldDisplay,
  children,
}: NotificationFlashProps): ReactElement => {
  const [translateX, messageScale, explosionOpacity, messageOpacity] =
    useFlashAnimationValues(shouldDisplay)

  const colors = getColors()

  const styles = StyleSheet.create({
    pinkExplosion: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
      backgroundColor: colors.harpguruPink,
    },
    messageUnderlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 11,
      backgroundColor: colors.pageColor,
    },
    message: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 12,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  })

  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: explosionOpacity.value,
    }
  })
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: messageOpacity.value,
    }
  })
  const animatedStyle3 = useAnimatedStyle(() => {
    return {
      transform: [
        // WARNING: in iOS only; the scale *must* be performed before the
        // translation, or the translation will not be observed at all.
        // I do not have a good explanation for this and it doesn't seem
        // to conform to the observation of the other comment added in
        // this commit.
        { scale: messageScale.value },
        { translateX: translateX.value },
      ],
      opacity: messageOpacity.value,
    }
  })

  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={[styles.pinkExplosion, animatedStyle1]}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.messageUnderlay, animatedStyle2]}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.message, animatedStyle3]}
      >
        {children}
      </Animated.View>
    </>
  )
}
