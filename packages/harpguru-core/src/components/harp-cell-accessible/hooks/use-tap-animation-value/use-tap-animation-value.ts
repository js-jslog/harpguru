import { useTimingTransition } from 'react-native-redash'
import { Easing, interpolate, Node } from 'react-native-reanimated'

export const useTapAnimationValue = (isTapped: boolean): Node<number> => {
  const transitionValue = useTimingTransition(isTapped, {
    duration: 100,
    easing: Easing.inOut(Easing.circle),
  })
  const animationValue = interpolate(transitionValue, {
    inputRange: [0, 1],
    outputRange: isTapped ? [0.5, 1] : [1, 1],
  })

  return animationValue
}
