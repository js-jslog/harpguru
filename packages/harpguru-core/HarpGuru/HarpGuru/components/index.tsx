import 'react-native-gesture-handler'

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler'
import { View } from 'react-native'
import React, { useState } from 'react'
import type { ReactElement } from 'react'
import {
  getApparatusIds,
  getPozitionIds,
  getPitchIds,
  getHarpStrata,
} from 'harpstrata'
import type { ActiveIds, HarpStrata, HarpStrataProps } from 'harpstrata'

import { styles } from '../styles'
import { usePrevious } from '../../helpers'
import { themeSizes } from '../../Styles'
import { HomeScreen } from '../../Screens'
import { AnimatedMenuContainer, CovariantMenu, LayoutMenu } from '../../Menus'
import { DisplayModes } from '../../HarpFace'

const { 8: swipeThreshold } = themeSizes

const [initialApparatusId] = getApparatusIds()
const [initialPozitionId] = getPozitionIds()
const [initialPitchId] = getPitchIds()
const initialActiveIds: ActiveIds = []

const initialHarpStrataProps: HarpStrataProps = {
  apparatusId: initialApparatusId,
  pozitionId: initialPozitionId,
  harpKeyId: initialPitchId,
  activeIds: initialActiveIds,
}
const initialHarpStrata: HarpStrata = getHarpStrata(initialHarpStrataProps)
const { Degree: initialDisplayMode } = DisplayModes

enum MenuStates {
  LayoutMenu,
  CovariantMenu,
  NoMenu,
}

export const HarpGuru = (): ReactElement => {
  const [activeHarpStrata, setActiveHarpStrata] = useState(initialHarpStrata)
  const [activeDisplayMode, setActiveDisplayMode] = useState(initialDisplayMode)

  const screenProps = {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
    setActiveDisplayMode,
  }
  const covariantMenuProps = {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
    setActiveDisplayMode,
  }
  const layoutMenuProps = {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
    setActiveDisplayMode,
  }

  const [panState, setPanState] = useState<State>(State.UNDETERMINED)
  const [menuState, setMenuState] = useState<MenuStates>(MenuStates.NoMenu)
  const [translationX, setTranslationX] = useState<number>(0)
  const previousPanState = usePrevious(panState, State.UNDETERMINED)

  const handleSwipe = ({ nativeEvent }: PanGestureHandlerGestureEvent) => {
    setPanState(nativeEvent.state)
    setTranslationX(nativeEvent.translationX)
  }

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

  return (
    <PanGestureHandler
      activeOffsetX={[swipeThreshold * -1, swipeThreshold]}
      onHandlerStateChange={handleSwipe}
    >
      <View style={styles.overlay}>
        <HomeScreen {...screenProps} />
        <AnimatedMenuContainer
          onScreen={menuState === MenuStates.CovariantMenu}
        >
          <CovariantMenu {...covariantMenuProps} />
        </AnimatedMenuContainer>
        <AnimatedMenuContainer onScreen={menuState === MenuStates.LayoutMenu}>
          <LayoutMenu {...layoutMenuProps} />
        </AnimatedMenuContainer>
      </View>
    </PanGestureHandler>
  )
}
