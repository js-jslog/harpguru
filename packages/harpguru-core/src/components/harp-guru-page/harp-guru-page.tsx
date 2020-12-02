import 'react-native-gesture-handler'

import type { Value } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { ToggleBufferFlusher } from '../toggle-buffer-flusher'
import { QuizQuestionDisplay } from '../quiz-question-display'
import { NextPageButton } from '../next-page-button'
import { LayoutMenu } from '../layout-menu'
import { HarpFaceMemo } from '../harp-face'
import { CovariantMenu } from '../covariant-menu'
import { ActivityLegend } from '../activity-legend'
import { MenuStates, MenuStashPosition } from '../../types'
import { colors } from '../../styles'
import { getSizes } from '../../styles'

import { useMenus } from './hooks'

type HarpGuruPageProps = {
  readonly pageInFrame: Value<0 | 1>
  readonly otherPage: 0 | 1
}

export const HarpGuruPage = ({
  pageInFrame,
  otherPage,
}: HarpGuruPageProps): ReactElement => {
  const [menuState, handleSwipe, handleTap] = useMenus()
  const covariantOpenCloseTapHandler = () => {
    handleTap(MenuStates.CovariantMenu)
  }
  const layoutOpenCloseTapHandler = () => {
    handleTap(MenuStates.LayoutMenu)
  }

  const sizes = getSizes()
  const { 8: swipeThreshold } = sizes

  const styles = StyleSheet.create({
    fillScreen: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.pageColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  const handleTapStateChange = () => {
    pageInFrame.setValue(otherPage)
  }

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
        <ToggleBufferFlusher />
        <QuizQuestionDisplay isScreenFree={menuState === MenuStates.NoMenu} />
        <NextPageButton
          stashPosition={MenuStashPosition.Bottom}
          getNextPage={handleTapStateChange}
        />
      </View>
    </PanGestureHandler>
  )
}
