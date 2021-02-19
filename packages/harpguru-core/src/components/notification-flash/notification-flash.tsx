import Animated, { multiply } from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { ChildrenProps } from '../../types'
import { colors, harpguruColors } from '../../styles'

import { useFlashAnimationValues } from './hooks'

type NotificationFlashProps = ChildrenProps & {
  readonly shouldDisplay: boolean
  readonly messageScaleMultiplier?: number
}

export const NotificationFlash = ({
  shouldDisplay,
  messageScaleMultiplier = 1,
  children,
}: NotificationFlashProps): ReactElement => {
  const [
    translateX,
    messageScale,
    explosionOpacity,
    messageOpacity,
  ] = useFlashAnimationValues(shouldDisplay)

  const styles = StyleSheet.create({
    wrapper: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
      justifyContent: 'center',
    },
    pinkExplosion: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: harpguruColors.pink,
    },
    messageUnderlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.pageColor,
    },
    message: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  })

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [{ translateX: translateX }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.pinkExplosion,
          {
            opacity: explosionOpacity,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.messageUnderlay,
          {
            opacity: messageOpacity,
          },
        ]}
      />
      <Animated.View
        style={[
          {
            transform: [
              {
                scale: multiply(messageScale, messageScaleMultiplier),
              },
            ],
            opacity: messageOpacity,
          },
        ]}
      >
        <View style={styles.message}>{children}</View>
      </Animated.View>
    </Animated.View>
  )
}
