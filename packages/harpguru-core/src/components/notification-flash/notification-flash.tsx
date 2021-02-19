import Animated, { multiply } from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
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
    pinkExplosion: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
      backgroundColor: harpguruColors.pink,
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
      backgroundColor: 'red',
    },
  })

  return (
    <>
      <Animated.View
        style={[
          styles.pinkExplosion,
          {
            transform: [{ translateX: translateX }],
            opacity: explosionOpacity,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.messageUnderlay,
          {
            transform: [{ translateX: translateX }],
            opacity: messageOpacity,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.message,
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
        {children}
      </Animated.View>
    </>
  )
}
