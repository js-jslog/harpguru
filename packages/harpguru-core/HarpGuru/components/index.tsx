import 'react-native-gesture-handler'

import type { State as GlobalState } from 'reactn/default'
import { addReducer, useDispatch, useGlobal } from 'reactn'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler'
import { View } from 'react-native'
import React, { useState } from 'react'
import type { ReactElement } from 'react'
import { getHarpStrata } from 'harpstrata'

import { DisplayModes } from '../types'
import { styles } from '../styles'
import { ExperienceModes } from '../helpers/setGlobalReactNState'
import {
  usePrevious,
  getPropsForHarpStrata,
  getNextQuizQuestion,
  setGlobalReactNState,
  activateHarpCell,
} from '../helpers'
import { themeSizes } from '../Theme'
import {
  HomeScreen,
  CovariantMenuScreen,
  LayoutMenuScreen,
  QuizQuestionScreen,
} from '../Screens'

setGlobalReactNState()

addReducer('requestNextQuestion', (global: GlobalState) => {
  const { activeHarpStrata, quizQuestion, activeDisplayMode } = global
  const nextQuizQuestion = getNextQuizQuestion(quizQuestion, activeDisplayMode)
  const harpStrataProps = getPropsForHarpStrata(
    activeHarpStrata,
    DisplayModes.Degree
  )
  const resetActiveHarpStrata = getHarpStrata({
    ...harpStrataProps,
    activeIds: [],
  })
  return {
    activeHarpStrata: resetActiveHarpStrata,
    quizQuestion: nextQuizQuestion,
  }
})

addReducer('revealAnswer', (global: GlobalState) => {
  const { activeHarpStrata, quizQuestion } = global
  const props = {
    harpStrata: activeHarpStrata,
    cellId: quizQuestion,
  }
  return {
    activeHarpStrata: activateHarpCell(props),
  }
})

const { 8: swipeThreshold } = themeSizes

enum MenuStates {
  LayoutMenu,
  CovariantMenu,
  NoMenu,
}

export const HarpGuru = (): ReactElement => {
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const requestNextQuestion = useDispatch('requestNextQuestion')

  const [panState, setPanState] = useState<State>(State.UNDETERMINED)
  const [menuState, setMenuState] = useState<MenuStates>(MenuStates.NoMenu)
  const [translationX, setTranslationX] = useState<number>(0)
  const previousPanState = usePrevious(panState, State.UNDETERMINED)
  const previousMenuState = usePrevious(menuState, MenuStates.NoMenu)

  const covariantMenuScreenProps = {
    onScreen: menuState === MenuStates.CovariantMenu,
  }
  const layoutMenuScreenProps = {
    onScreen: menuState === MenuStates.LayoutMenu,
  }
  const quizQuestionScreenProps = {
    screenFree: menuState === MenuStates.NoMenu,
  }

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

  if (
    menuState === MenuStates.NoMenu &&
    previousMenuState !== MenuStates.NoMenu &&
    activeExperienceMode === ExperienceModes.Quiz
  )
    requestNextQuestion()

  return (
    <PanGestureHandler
      activeOffsetX={[swipeThreshold * -1, swipeThreshold]}
      onHandlerStateChange={handleSwipe}
    >
      <View style={styles.overlay}>
        <HomeScreen />
        <CovariantMenuScreen {...covariantMenuScreenProps} />
        <LayoutMenuScreen {...layoutMenuScreenProps} />
        <QuizQuestionScreen {...quizQuestionScreenProps} />
      </View>
    </PanGestureHandler>
  )
}
