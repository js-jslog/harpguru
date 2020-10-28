import Animated, { add } from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React from 'react'

import {
  getMenuAnimationValues,
  getScaledMenuLabelProtrusion,
} from '../../utils'
import type { MenuProps } from '../../types'

import { useTapAnimation } from './hooks'

type LocalMenuProps = MenuProps & {
  readonly children: React.ReactNode
}
export const MenuOpenButton = ({
  hideMenu,
  hideLabel,
  stashPosition,
  openCloseTapHandler,
  children,
}: LocalMenuProps): React.ReactElement => {
  const { labelCounterScale } = getMenuAnimationValues(
    hideMenu,
    hideLabel,
    stashPosition
  )
  const scaledLabelProtrusion = getScaledMenuLabelProtrusion()

  const styles = StyleSheet.create({
    label: {
      alignItems: 'center',
      justifyContent: 'center',
      width: scaledLabelProtrusion,
    },
  })

  const [tapAnimationValue, handleTapStateChange] = useTapAnimation(
    openCloseTapHandler
  )
  const totalScaleValue = add(tapAnimationValue, labelCounterScale)

  return (
    <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
      <View style={styles.label}>
        <Animated.View
          style={[
            {
              transform: [{ scale: totalScaleValue }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </TapGestureHandler>
  )
}
