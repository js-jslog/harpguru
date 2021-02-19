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
    backgroundwrapper: {
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
    messageWrapper: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 11,
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
          styles.backgroundwrapper,
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
      </Animated.View>
      <Animated.View
        style={[
          styles.messageWrapper,
          {
            transform: [
              {
                // WARNING: in iOS only; the scale *must* be performed before the
                // translation, or the translation will not be observed at all.
                // I do not have a good explanation for this and it doesn't seem
                // to conform to the observation of the other comment added in
                // this commit.
                scale: multiply(messageScale, messageScaleMultiplier),
                translateX: translateX,
              },
            ],
            opacity: messageOpacity,
          },
        ]}
      >
        <View style={styles.message}>{children}</View>
      </Animated.View>
    </>
  )
}
