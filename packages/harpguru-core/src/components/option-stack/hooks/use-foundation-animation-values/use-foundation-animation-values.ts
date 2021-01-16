import { withTimingTransition } from 'react-native-redash'
import { Easing, Value } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'

type FoundationAnimationValues = {
  readonly animationValue: Value<number>
  readonly transitionValue: Node<number>
}

export const useFoundationAnimationValues = (): FoundationAnimationValues => {
  const animationDuration = 300
  const animationValue = new Value<number>(0)
  const transitionValue = withTimingTransition(animationValue, {
    duration: animationDuration,
    easing: Easing.inOut(Easing.ease),
  })

  return {
    animationValue,
    transitionValue,
  }
}
