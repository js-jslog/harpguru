import Animated from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { TapAnimationTypes } from '../../types'
import type { OptionIds } from '../../types'
import { colors } from '../../styles'
import { useSizes, useScaleAndCallbackOnTap } from '../../hooks'

import { useScaleOnUpdateAnimation } from './hooks'

type OptionValueProps = {
  readonly id: OptionIds | undefined
  readonly isActive: boolean
  readonly setFunction: (arg0: OptionIds) => void
}

export const OptionValue = ({
  id,
  isActive,
  setFunction,
}: OptionValueProps): React.ReactElement => {
  const tapHandlerCallback = () => {
    if (id === undefined) return
    setFunction(id)
  }
  const [tapAnimationValue, handleTapStateChange] = useScaleAndCallbackOnTap(
    tapHandlerCallback,
    [1, 2],
    [1, 2],
    TapAnimationTypes.Safe
  )

  const optionUpdateAnimationValue = useScaleOnUpdateAnimation(id)

  const sizes = useSizes()
  const { baseStyle, activeStyle } = StyleSheet.create({
    baseStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: sizes['7'],
      lineHeight: sizes['8'],
      color: colors.inertOutline,
      minWidth: '50%',
    },
    activeStyle: {
      // sizes['8'] is just a little too big for the wide
      // words to fit in the column. This is a compromise
      // since I can't think of a better way to highlight
      // the words. When they are not all capital letters
      // anymore this should be less of a problem.
      fontSize: sizes['7'] + sizes['5'],
      fontWeight: 'bold',
      lineHeight: sizes['9'],
    },
  })
  const style = isActive ? [baseStyle, activeStyle] : baseStyle

  return (
    <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
      <Animated.View
        style={[
          {
            transform: [
              {
                scale: isActive
                  ? optionUpdateAnimationValue
                  : tapAnimationValue,
              },
            ],
          },
        ]}
      >
        <View>
          <Text style={style}>{id ? id : ' '}</Text>
        </View>
      </Animated.View>
    </TapGestureHandler>
  )
}
