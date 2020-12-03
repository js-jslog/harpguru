import Animated, { multiply } from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { ChildrenProps } from '../../types'
import { colors } from '../../styles'

import { useFlashAnimationValues } from './hooks'

type NotificationFlashProps = ChildrenProps & {
  readonly shouldDisplay: boolean
  readonly additionalScaleFactor?: number
}

export const NotificationFlash = ({
  shouldDisplay,
  additionalScaleFactor = 1,
  children,
}: NotificationFlashProps): ReactElement => {
  const [
    translateX,
    messageScale,
    explosionOpacity,
    displayOpacity,
  ] = useFlashAnimationValues(shouldDisplay)

  const styles = StyleSheet.create({
    animated: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
    },
    messageUnderlay: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      backgroundColor: colors.pageColor,
    },
    flashOverlay: {
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
            opacity: explosionOpacity,
          },
        ]}
      >
        <View style={styles.flashOverlay} />
      </Animated.View>
      <Animated.View
        style={[
          styles.animated,
          {
            transform: [
              {
                translateX: translateX,
                scale: multiply(messageScale, additionalScaleFactor),
              },
            ],
            opacity: displayOpacity,
          },
        ]}
      >
        <View style={styles.messageUnderlay}>
          <View style={styles.mainContents}>
            <View style={styles.message}>{children}</View>
          </View>
        </View>
      </Animated.View>
    </>
  )
}
