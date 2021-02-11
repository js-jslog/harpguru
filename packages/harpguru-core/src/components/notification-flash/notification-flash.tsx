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
    messageUnderlayOpacity,
  ] = useFlashAnimationValues(shouldDisplay)

  const styles = StyleSheet.create({
    messageUnderlay: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      zIndex: 10,
      backgroundColor: colors.pageColor,
    },
    explosionOverlay: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      zIndex: 10,
      backgroundColor: harpguruColors.pink,
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
          styles.explosionOverlay,
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
            opacity: messageUnderlayOpacity,
          },
        ]}
      >
        <View style={styles.message}>{children}</View>
      </Animated.View>
    </>
  )
}
