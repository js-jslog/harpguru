import { withTimingTransition } from 'react-native-redash'
import { Easing, Value } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'

type FoundationAnimationValues = {
  readonly stackState: Value<number>
  readonly stackStateTransition: Node<number>
}

export const useFoundationAnimationValues = (): FoundationAnimationValues => {
  const animationDuration = 300
  const stackState = new Value<number>(0)
  const stackStateTransition = withTimingTransition(stackState, {
    duration: animationDuration,
    easing: Easing.inOut(Easing.ease),
  })

  return {
    stackState,
    stackStateTransition,
  }
}
