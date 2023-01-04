import {
  Easing,
  useSharedValue,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'

type FoundationAnimationValues = {
  readonly stackState: SharedValue<number>
  readonly stackStateTransition: SharedValue<number>
}

export const useFoundationAnimationValues = (): FoundationAnimationValues => {
  const animationDuration = 300
  const stackState = useSharedValue<number>(0)
  const stackStateTransition = useDerivedValue(() =>
    withTiming(stackState.value, {
      duration: animationDuration,
      easing: Easing.inOut(Easing.ease),
    })
  )

  return {
    stackState,
    stackStateTransition,
  }
}
