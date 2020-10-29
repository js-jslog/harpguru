import { useState, useEffect } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import Animated, {
  Easing,
  interpolate,
} from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { TapAnimationTypes } from '../../types'
import type { OptionIds } from '../../types'
import { getSizes, colors } from '../../styles'
import { useScaleAndCallbackOnTap, usePrevious } from '../../hooks'

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
    [1, 1.8],
    [1, 1.8],
    TapAnimationTypes.Safe
  )

  const [shouldDoUpdateAnimation, setShouldDoUpdateAnimation] = useState(false)
  const [doUpdateAnimation, setDoUpdateAnimation] = useState(false)
  const previousId = usePrevious(id, undefined)
  const idChanged = previousId !== id

  const optionUpdatedVal = useTimingTransition(doUpdateAnimation, {
    duration: 800,
    easing: Easing.inOut(Easing.circle),
  })
  const optionUpdateTransition = interpolate(optionUpdatedVal, {
    inputRange: [0, 1],
    outputRange: doUpdateAnimation ? [1.8, 1] : [1, 1],
  })

  useEffect(() => {
    if (!idChanged || shouldDoUpdateAnimation === true) return
    setShouldDoUpdateAnimation(true)
  }, [idChanged, shouldDoUpdateAnimation, setShouldDoUpdateAnimation])

  useEffect(() => {
    const timeForUpdateAnimation = setTimeout(() => {
      if (!shouldDoUpdateAnimation || doUpdateAnimation) return
      setDoUpdateAnimation(true)
      setShouldDoUpdateAnimation(false)
    }, 100)
    return () => {
      clearTimeout(timeForUpdateAnimation)
    }
  }, [
    shouldDoUpdateAnimation,
    doUpdateAnimation,
    setDoUpdateAnimation,
    setShouldDoUpdateAnimation,
  ])

  useEffect(() => {
    const afterUpdateAnimation = setTimeout(() => {
      if (!doUpdateAnimation) return
      setDoUpdateAnimation(false)
    }, 300)
    return () => {
      clearTimeout(afterUpdateAnimation)
    }
  }, [doUpdateAnimation, setDoUpdateAnimation])

  const sizes = getSizes()
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
              { scale: isActive ? optionUpdateTransition : tapAnimationValue },
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
