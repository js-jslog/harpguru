import { useEffect } from 'reactn'
import { State } from 'react-native-gesture-handler'
import type { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { useState } from 'react'

import { MenuStates } from '../../../../types'
import { usePrevious } from '../../../../hooks'

type HandleSwipe = (arg0: PanGestureHandlerGestureEvent) => void
type HandleTap = (
  arg0: MenuStates,
  arg1: TapGestureHandlerStateChangeEvent
) => void

export const useMenus = (): [MenuStates, HandleSwipe, HandleTap] => {
  const [panState, setPanState] = useState<State>(State.UNDETERMINED)
  const [menuState, setMenuState] = useState<MenuStates>(MenuStates.NoMenu)
  const [translationX, setTranslationX] = useState<number>(0)
  const previousPanState = usePrevious(panState, State.UNDETERMINED)

  useEffect(() => {
    if (panState === State.END && previousPanState === State.ACTIVE) {
      if (menuState === MenuStates.NoMenu && translationX < 0) {
        setMenuState(MenuStates.LayoutMenu)
      } else if (menuState === MenuStates.NoMenu && translationX > 0) {
        setMenuState(MenuStates.CovariantMenu)
      } else if (menuState === MenuStates.CovariantMenu && translationX < 0) {
        setMenuState(MenuStates.NoMenu)
      } else if (menuState === MenuStates.LayoutMenu && translationX > 0) {
        setMenuState(MenuStates.NoMenu)
      }
      setPanState(State.UNDETERMINED)
      setTranslationX(0)
    }
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
    setPanState(nativeEvent.state)
    setTranslationX(nativeEvent.translationX)
  }
  return [menuState, handleSwipe, handleTap]
}
