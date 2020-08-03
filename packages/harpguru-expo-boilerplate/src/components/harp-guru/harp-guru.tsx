import 'react-native-gesture-handler'

import { PanGestureHandler } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { QuizQuestionDisplay } from '../quiz-question-display'
import { LayoutMenu } from '../layout-menu'
import { HarpFace } from '../harp-face'
import { CovariantMenu } from '../covariant-menu'
import { setGlobalState, setGlobalReducers } from '../../utils'
import { MenuStates } from '../../types'
import { colors } from '../../styles'
import { sizes } from '../../styles'

import { useSwipeMenus, useQuizCycle } from './hooks'

setGlobalState()
setGlobalReducers()

const { 8: swipeThreshold } = sizes

const styles = StyleSheet.create({
  fillScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.pageColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const HarpGuru = (): ReactElement => {
  const [menuState, handleSwipe] = useSwipeMenus()

  useQuizCycle(menuState)

  return (
    <PanGestureHandler
      activeOffsetX={[swipeThreshold * -1, swipeThreshold]}
      onHandlerStateChange={handleSwipe}
    >
      <View style={styles.fillScreen}>
        <HarpFace />
        <CovariantMenu onScreen={menuState === MenuStates.CovariantMenu} />
        <LayoutMenu onScreen={menuState === MenuStates.LayoutMenu} />
        <QuizQuestionDisplay screenFree={menuState === MenuStates.NoMenu} />
      </View>
    </PanGestureHandler>
  )
}
