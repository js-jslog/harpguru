import 'react-native-gesture-handler'

import { PanGestureHandler } from 'react-native-gesture-handler'
import type { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
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

import { useMenus, useQuizCycle } from './hooks'

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
  const [menuState, handleSwipe, handleTap] = useMenus()
  const covariantTapHandler = (event: TapGestureHandlerStateChangeEvent) => {
    handleTap(MenuStates.CovariantMenu, event)
  }
  const layoutTapHandler = (event: TapGestureHandlerStateChangeEvent) => {
    handleTap(MenuStates.LayoutMenu, event)
  }

  useQuizCycle(menuState)

  return (
    <PanGestureHandler
      activeOffsetX={[swipeThreshold * -1, swipeThreshold]}
      onHandlerStateChange={handleSwipe}
    >
      <View style={styles.fillScreen}>
        <HarpFace />
        <CovariantMenu
          hideMenu={menuState !== MenuStates.CovariantMenu}
          hideLabel={
            menuState !== MenuStates.CovariantMenu &&
            menuState !== MenuStates.NoMenu
          }
          tapHandler={covariantTapHandler}
        />
        <LayoutMenu
          hideMenu={menuState !== MenuStates.LayoutMenu}
          hideLabel={
            menuState !== MenuStates.LayoutMenu &&
            menuState !== MenuStates.NoMenu
          }
          tapHandler={layoutTapHandler}
        />
        <QuizQuestionDisplay screenFree={menuState === MenuStates.NoMenu} />
      </View>
    </PanGestureHandler>
  )
}
