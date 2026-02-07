import { useDerivedValue, runOnJS, withSpring } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { Gesture } from 'react-native-gesture-handler'
import type { GestureType } from 'react-native-gesture-handler'
import React from 'react'

export const useScaleAndCallbackOnTap = (
  callback: () => void,
  inflation: number
): [SharedValue<number>, GestureType] => {
  const [isTapped, setIsTapped] = React.useState(false)
  const setIsTappedWrapper = (isTapped: boolean) => {
    setIsTapped(isTapped)
  }
  const animationValue = useDerivedValue(() => {
    return withSpring(isTapped ? inflation : 1)
  })

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      runOnJS(setIsTappedWrapper)(true)
    })
    .onEnd(() => {
      runOnJS(setIsTappedWrapper)(false)
      runOnJS(callback)()
    })
    .onFinalize(() => {
      runOnJS(setIsTappedWrapper)(false)
    })

  return [animationValue, tapGesture]
}
