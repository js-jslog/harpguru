import {
  useDerivedValue,
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import type {
  GestureEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler'
import React from 'react'

type GestureHandler = (
  arg0: GestureEvent<TapGestureHandlerEventPayload>
) => void

export const useScaleAndCallbackOnTap = (
  callback: () => void,
  inflation: number
): [SharedValue<number>, GestureHandler] => {
  const [isTapped, setIsTapped] = React.useState(false)
  const setIsTappedWrapper = (isTapped: boolean) => {
    setIsTapped(isTapped)
  }
  const animationValue = useDerivedValue(() => {
    return withSpring(isTapped ? inflation : 1)
  })

  const gestureHandler = useAnimatedGestureHandler<
    GestureEvent<TapGestureHandlerEventPayload>
  >(
    {
      onStart: () => {
        runOnJS(setIsTappedWrapper)(true)
      },
      onCancel: () => {
        runOnJS(setIsTappedWrapper)(false)
      },
      onFail: () => {
        runOnJS(setIsTappedWrapper)(false)
      },
      onEnd: () => {
        runOnJS(setIsTappedWrapper)(false)
        runOnJS(callback)()
      },
      onFinish: () => {
        runOnJS(setIsTappedWrapper)(false)
      },
    },
    [setIsTappedWrapper]
  )

  return [animationValue, gestureHandler]
}
