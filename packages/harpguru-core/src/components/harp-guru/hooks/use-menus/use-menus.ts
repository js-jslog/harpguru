import { useEffect } from 'reactn'
import { State } from 'react-native-gesture-handler'
import type { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { useState } from 'react'

import { MenuStates } from '../../../../types'

type HandleSwipe = (arg0: PanGestureHandlerGestureEvent) => void
type HandleTap = (
  arg0: MenuStates,
  arg1: TapGestureHandlerStateChangeEvent
) => void

export const useMenus = (): [MenuStates, HandleSwipe, HandleTap] => {
  const [panState, setPanState] = useState<State>(State.UNDETERMINED)
  const [menuState, setMenuState] = useState<MenuStates>(MenuStates.NoMenu)
  const [translationX, setTranslationX] = useState<number>(0)
  const [translationY, setTranslationY] = useState<number>(0)

  const isSwipeLeft = (x: number) => x < 0
  const isSwipeRight = (x: number) => x > 0
  const isSwipeUp = (y: number) => y < 0
  const isSwipeDown = (y: number) => y > 0

  useEffect(() => {
    if (isSwipeLeft(translationX) && isSwipeDown(translationY)) {
      setMenuState(MenuStates.CovariantMenu)
    }
    if (isSwipeLeft(translationX) && isSwipeUp(translationY)) {
      setMenuState(MenuStates.LayoutMenu)
    }
    if (
      (menuState === MenuStates.CovariantMenu ||
        menuState === MenuStates.LayoutMenu) &&
      isSwipeRight(translationX)
    ) {
      setMenuState(MenuStates.NoMenu)
    }
    setPanState(State.UNDETERMINED)
    setTranslationX(0)
  }, [panState])

  const handleTap = (
    menu: MenuStates,
    { nativeEvent }: TapGestureHandlerStateChangeEvent
  ) => {
    if (nativeEvent.state !== State.ACTIVE) return
    if (menuState === menu) {
      setMenuState(MenuStates.NoMenu)
    } else {
      setMenuState(menu)
    }
  }

  const handleSwipe = ({ nativeEvent }: PanGestureHandlerGestureEvent) => {
    if (nativeEvent.state !== State.END) return
    setTranslationX(nativeEvent.translationX)
    setTranslationY(nativeEvent.translationY)
    setPanState(nativeEvent.state)
  }
  return [menuState, handleSwipe, handleTap]
}
