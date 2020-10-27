import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate, add } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'
import {
  TapGestureHandlerStateChangeEvent,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler'
import React from 'react'

import { usePrevious } from '../../hooks'

type ChildProps = {
  readonly children: React.ReactNode
  readonly counterScale: Node<number>
  readonly openCloseMenu: () => void
}

export const MenuOpenButton = ({
  children,
  counterScale,
  openCloseMenu,
}: ChildProps): React.ReactElement => {
  const [isTapped, setIsTapped] = React.useState(false)
  const changedTap = isTapped !== usePrevious(isTapped, isTapped)
  const tapTransitionValue = useTimingTransition(isTapped, {
    duration: 100,
    easing: Easing.inOut(Easing.circle),
  })
  const tapAnimationValue = interpolate(tapTransitionValue, {
    inputRange: [0, 1],
    outputRange: isTapped ? [1, 5] : [1, 5],
  })
  const handleTapStateChange = (event: TapGestureHandlerStateChangeEvent) => {
    const { nativeEvent } = event
    if (nativeEvent.state === State.BEGAN) setIsTapped(true)
    if ([State.FAILED, State.CANCELLED].includes(nativeEvent.state))
      setIsTapped(false)
    if (nativeEvent.state === State.END) setIsTapped(false)
  }

  React.useEffect(() => {
    const postAnimation = setTimeout(() => {
      if (changedTap === false) return
      setIsTapped(false)
      openCloseMenu()
    }, 100)
    return () => {
      clearTimeout(postAnimation)
    }
  }, [changedTap, setIsTapped])

  const totalScaleValue = add(tapAnimationValue, counterScale)

  return (
    <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
      <Animated.View
        style={[
          {
            transform: [{ scale: totalScaleValue }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </TapGestureHandler>
  )
}
