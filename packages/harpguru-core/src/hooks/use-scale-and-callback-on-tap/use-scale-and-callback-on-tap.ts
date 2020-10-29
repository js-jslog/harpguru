import { useTimingTransition } from 'react-native-redash'
import { Node, Easing, interpolate } from 'react-native-reanimated'
import { State } from 'react-native-gesture-handler'
import type { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
import React from 'react'

import { usePrevious } from '../use-previous'
import { tapAnimationDuration } from '../../constants'

type TapEventHandler = (arg0: TapGestureHandlerStateChangeEvent) => void

export const useScaleAndCallbackOnTap = (
  callback: () => void,
  scaleIn: [number, number],
  scaleOut: [number, number],
  shouldAnimateOut: boolean
): [Node<number>, TapEventHandler] => {
  const [isTapped, setIsTapped] = React.useState(false)
  const changedTap = isTapped !== usePrevious(isTapped, isTapped)
  const tapTransitionValue = useTimingTransition(isTapped, {
    duration: tapAnimationDuration,
    easing: Easing.inOut(Easing.circle),
  })
  const tapAnimationValue = interpolate(tapTransitionValue, {
    inputRange: [0, 1],
    outputRange: isTapped ? scaleIn : scaleOut,
  })
  const handleTapStateChange = (event: TapGestureHandlerStateChangeEvent) => {
    const { nativeEvent } = event
    if (nativeEvent.state === State.BEGAN) setIsTapped(true)
    if ([State.FAILED, State.CANCELLED].includes(nativeEvent.state))
      setIsTapped(false)
    if (nativeEvent.state !== State.END) return
    if (!shouldAnimateOut) callback()
    setIsTapped(false)
  }

  React.useEffect(() => {
    const postAnimation = setTimeout(() => {
      if (changedTap === false || !shouldAnimateOut) return
      setIsTapped(false)
      callback()
    }, tapAnimationDuration)
    return () => {
      clearTimeout(postAnimation)
    }
  }, [changedTap, setIsTapped, callback, shouldAnimateOut])

  return [tapAnimationValue, handleTapStateChange]
}
