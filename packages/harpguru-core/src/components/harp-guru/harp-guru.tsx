import 'react-native-gesture-handler'

import { createProvider, getGlobal } from 'reactn'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { ToggleBufferFlusher } from '../toggle-buffer-flusher'
import { QuizQuestionDisplay } from '../quiz-question-display'
import { LayoutMenu } from '../layout-menu'
import { HarpFaceMemo } from '../harp-face'
import { CovariantMenu } from '../covariant-menu'
import { ActivityLegend } from '../activity-legend'
import { setGlobalState } from '../../utils'
import { MenuStates, MenuStashPosition } from '../../types'
import { colors } from '../../styles'
import { getSizes } from '../../styles'

import { useMenus } from './hooks'

setGlobalState()

const styles = StyleSheet.create({
  fillScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.pageColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillScreenShifted: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.pageColor,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: 500 }],
  },
})

export const HarpGuru = (): ReactElement => {
  const [menuState, handleSwipe, handleTap] = useMenus()
  const covariantOpenCloseTapHandler = () => {
    handleTap(MenuStates.CovariantMenu)
  }
  const layoutOpenCloseTapHandler = () => {
    handleTap(MenuStates.LayoutMenu)
  }

  const sizes = getSizes()
  const { 8: swipeThreshold } = sizes

  const Provider1 = createProvider(getGlobal())
  const Provider2 = createProvider(getGlobal())

  return (
    <>
      <Provider1>
        <PanGestureHandler
          activeOffsetX={[swipeThreshold * -1, swipeThreshold]}
          onHandlerStateChange={handleSwipe}
        >
          <View style={styles.fillScreen}>
            <ActivityLegend />
            <HarpFaceMemo />
            <CovariantMenu
              isMenuStashed={menuState !== MenuStates.CovariantMenu}
              isLabelHidden={
                menuState !== MenuStates.CovariantMenu &&
                menuState !== MenuStates.NoMenu
              }
              stashPosition={MenuStashPosition.Top}
              openCloseMenu={covariantOpenCloseTapHandler}
            />
            <LayoutMenu
              isMenuStashed={menuState !== MenuStates.LayoutMenu}
              isLabelHidden={
                menuState !== MenuStates.LayoutMenu &&
                menuState !== MenuStates.NoMenu
              }
              stashPosition={MenuStashPosition.Bottom}
              openCloseMenu={layoutOpenCloseTapHandler}
            />
            <ToggleBufferFlusher />
            <QuizQuestionDisplay
              isScreenFree={menuState === MenuStates.NoMenu}
            />
          </View>
        </PanGestureHandler>
      </Provider1>
      <Provider2>
        <PanGestureHandler
          activeOffsetX={[swipeThreshold * -1, swipeThreshold]}
          onHandlerStateChange={handleSwipe}
        >
          <View style={styles.fillScreenShifted}>
            <ActivityLegend />
            <HarpFaceMemo />
            <CovariantMenu
              isMenuStashed={menuState !== MenuStates.CovariantMenu}
              isLabelHidden={
                menuState !== MenuStates.CovariantMenu &&
                menuState !== MenuStates.NoMenu
              }
              stashPosition={MenuStashPosition.Top}
              openCloseMenu={covariantOpenCloseTapHandler}
            />
            <LayoutMenu
              isMenuStashed={menuState !== MenuStates.LayoutMenu}
              isLabelHidden={
                menuState !== MenuStates.LayoutMenu &&
                menuState !== MenuStates.NoMenu
              }
              stashPosition={MenuStashPosition.Bottom}
              openCloseMenu={layoutOpenCloseTapHandler}
            />
            <ToggleBufferFlusher />
            <QuizQuestionDisplay
              isScreenFree={menuState === MenuStates.NoMenu}
            />
          </View>
        </PanGestureHandler>
      </Provider2>
    </>
  )
}
