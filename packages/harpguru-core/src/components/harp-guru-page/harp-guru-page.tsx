import 'react-native-gesture-handler'

import type { Value } from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { ToggleBufferFlusher } from '../toggle-buffer-flusher'
import { ScaleNotification } from '../scale-notification'
import { QuizQuestionDisplay } from '../quiz-question-display'
import { MenuTabNextPage } from '../menu-tab-next-page'
import { MenuTabFragmentation } from '../menu-tab-fragmentation'
import { MenuTabExperienceMode } from '../menu-tab-experience-mode'
import { MenuTabDisplayMode } from '../menu-tab-display-mode'
import { MenuOfTunings } from '../menu-of-tunings'
import { MenuOfScales } from '../menu-of-scales'
import { MenuOfCovariants } from '../menu-of-covariants'
import { HarpFaceMemo } from '../harp-face'
import { ActivityLegend } from '../activity-legend'
import { MenuStates, MenuStashPosition, PageNumber } from '../../types'
import { colors } from '../../styles'

import { useMenus } from './hooks'

type HarpGuruPageProps = {
  readonly pageOnDisplay: Value<PageNumber>
  readonly thisPage: PageNumber
}

export const HarpGuruPage = ({
  pageOnDisplay,
  thisPage,
}: HarpGuruPageProps): ReactElement => {
  const [menuState, handleManuTap] = useMenus()

  const nextPageNumberMap: Record<PageNumber, PageNumber> = {
    1: 2,
    2: 3,
    3: 1,
  } as const

  const styles = StyleSheet.create({
    fillScreen: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.pageColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <View style={styles.fillScreen}>
      <ActivityLegend />
      <HarpFaceMemo />
      <MenuOfCovariants
        isMenuStashed={menuState !== MenuStates.CovariantMenu}
        isLabelHidden={
          menuState !== MenuStates.CovariantMenu &&
          menuState !== MenuStates.NoMenu
        }
        stashPosition={MenuStashPosition.First}
        openCloseMenu={() => handleManuTap(MenuStates.CovariantMenu)}
      />
      <MenuOfTunings
        isMenuStashed={menuState !== MenuStates.LayoutMenu}
        isLabelHidden={
          menuState !== MenuStates.LayoutMenu && menuState !== MenuStates.NoMenu
        }
        stashPosition={MenuStashPosition.Second}
        openCloseMenu={() => handleManuTap(MenuStates.LayoutMenu)}
      />
      <MenuOfScales
        isMenuStashed={menuState !== MenuStates.ScalesMenu}
        isLabelHidden={
          menuState !== MenuStates.ScalesMenu && menuState !== MenuStates.NoMenu
        }
        stashPosition={MenuStashPosition.Third}
        openCloseMenu={() => handleManuTap(MenuStates.ScalesMenu)}
      />
      <MenuTabDisplayMode
        isLabelHidden={menuState !== MenuStates.NoMenu}
        stashPosition={MenuStashPosition.Fourth}
      />
      <MenuTabFragmentation
        isLabelHidden={menuState !== MenuStates.NoMenu}
        stashPosition={MenuStashPosition.Fifth}
      />
      <MenuTabExperienceMode
        isLabelHidden={menuState !== MenuStates.NoMenu}
        stashPosition={MenuStashPosition.Sixth}
      />
      <MenuTabNextPage
        thisPage={thisPage}
        totalPages={3}
        stashPosition={MenuStashPosition.Seventh}
        getNextPage={() => pageOnDisplay.setValue(nextPageNumberMap[thisPage])}
      />
      <ToggleBufferFlusher />
      <QuizQuestionDisplay isScreenFree={menuState === MenuStates.NoMenu} />
      <ScaleNotification isScalesMenu={menuState === MenuStates.ScalesMenu} />
    </View>
  )
}
