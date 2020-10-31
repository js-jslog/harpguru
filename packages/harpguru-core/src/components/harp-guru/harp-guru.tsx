import 'react-native-gesture-handler'

import { PanGestureHandler } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { QuizQuestionDisplay } from '../quiz-question-display'
import { LayoutMenu } from '../layout-menu'
import { HarpFaceMemo } from '../harp-face'
import { CovariantMenu } from '../covariant-menu'
import { ActivityLegend } from '../activity-legend'
import { setGlobalState } from '../../utils'
import { MenuStates, MenuStashPosition } from '../../types'
import { colors } from '../../styles'
import { getSizes } from '../../styles'

import { useFlushBufferedActivityToggles, useMenus } from './hooks'

setGlobalState()

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
  const covariantOpenCloseTapHandler = () => {
    handleTap(MenuStates.CovariantMenu)
  }
  const layoutOpenCloseTapHandler = () => {
    handleTap(MenuStates.LayoutMenu)
  }

  const sizes = getSizes()
  const { 8: swipeThreshold } = sizes

  useFlushBufferedActivityToggles()

  return (
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
        <QuizQuestionDisplay isScreenFree={menuState === MenuStates.NoMenu} />
      </View>
    </PanGestureHandler>
  )
}
