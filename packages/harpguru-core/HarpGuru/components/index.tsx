import 'react-native-gesture-handler'

import { PanGestureHandler } from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { styles } from '../styles'
import { setGlobalReactNState, setGlobalReactNReducers } from '../helpers'
import { themeSizes } from '../Theme'
import {
  HomeScreen,
  CovariantMenuScreen,
  LayoutMenuScreen,
  QuizQuestionScreen,
} from '../Screens'

import { useSwipeMenus, MenuStates } from './useSwipeMenus'
import { useQuizCycle } from './useQuizCycle'

setGlobalReactNState()
setGlobalReactNReducers()

const { 8: swipeThreshold } = themeSizes

export const HarpGuru = (): ReactElement => {
  const [menuState, handleSwipe] = useSwipeMenus()

  useQuizCycle(menuState)

  return (
    <PanGestureHandler
      activeOffsetX={[swipeThreshold * -1, swipeThreshold]}
      onHandlerStateChange={handleSwipe}
    >
      <View style={styles.overlay}>
        <HomeScreen />
        <CovariantMenuScreen
          onScreen={menuState === MenuStates.CovariantMenu}
        />
        <LayoutMenuScreen onScreen={menuState === MenuStates.LayoutMenu} />
        <QuizQuestionScreen screenFree={menuState === MenuStates.NoMenu} />
      </View>
    </PanGestureHandler>
  )
}
