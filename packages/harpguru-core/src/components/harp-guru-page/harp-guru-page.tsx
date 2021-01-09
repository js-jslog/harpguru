import 'react-native-gesture-handler'

import type { Value } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { ToggleBufferFlusher } from '../toggle-buffer-flusher'
import { ScaleNotification } from '../scale-notification'
import { QuizQuestionDisplay } from '../quiz-question-display'
import { NextPageButton } from '../next-page-button'
import { LayoutMenu } from '../layout-menu'
import { HarpFaceMemo } from '../harp-face'
import { ExperienceModeButton } from '../experience-mode-button'
import { DisplayModeButton } from '../display-mode-button'
import { CovariantMenu } from '../covariant-menu'
import { ActivityLegend } from '../activity-legend'
import { MenuStates, MenuStashPosition, PageNumber } from '../../types'
import { colors, getSizes } from '../../styles'

import { useMenus } from './hooks'

type HarpGuruPageProps = {
  readonly pageOnDisplay: Value<PageNumber>
  readonly thisPage: PageNumber
}

export const HarpGuruPage = ({
  pageOnDisplay,
  thisPage,
}: HarpGuruPageProps): ReactElement => {
  const [menuState, handleMenuSwipe, handleManuTap] = useMenus()

  const nextPageNumberMap: Record<PageNumber, PageNumber> = {
    1: 2,
    2: 3,
    3: 1,
  } as const

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

  return (
    <PanGestureHandler
      activeOffsetX={[swipeThreshold * -1, swipeThreshold]}
      onHandlerStateChange={handleMenuSwipe}
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
          stashPosition={MenuStashPosition.First}
          openCloseMenu={() => handleManuTap(MenuStates.CovariantMenu)}
        />
        <LayoutMenu
          isMenuStashed={menuState !== MenuStates.LayoutMenu}
          isLabelHidden={
            menuState !== MenuStates.LayoutMenu &&
            menuState !== MenuStates.NoMenu
          }
          stashPosition={MenuStashPosition.Second}
          openCloseMenu={() => handleManuTap(MenuStates.LayoutMenu)}
        />
        <DisplayModeButton
          isLabelHidden={menuState !== MenuStates.NoMenu}
          stashPosition={MenuStashPosition.Third}
        />
        <ExperienceModeButton
          isLabelHidden={menuState !== MenuStates.NoMenu}
          stashPosition={MenuStashPosition.Fourth}
        />
        <NextPageButton
          thisPage={thisPage}
          totalPages={3}
          stashPosition={MenuStashPosition.Fifth}
          getNextPage={() =>
            pageOnDisplay.setValue(nextPageNumberMap[thisPage])
          }
        />
        <ToggleBufferFlusher />
        <QuizQuestionDisplay isScreenFree={menuState === MenuStates.NoMenu} />
        <ScaleNotification />
      </View>
    </PanGestureHandler>
  )
}
