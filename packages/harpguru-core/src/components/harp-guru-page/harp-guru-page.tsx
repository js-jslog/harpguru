import 'react-native-gesture-handler'

import type { Value } from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { ZoomSlideVertical } from '../zoom-slide-vertical'
import { ToggleBufferFlusher } from '../toggle-buffer-flusher'
import { NotifyOfScale } from '../notify-of-scale'
import { NotifyOfQuizQuestion } from '../notify-of-quiz-question'
import { MenuTabNextPage } from '../menu-tab-next-page'
import { MenuTabFragmentation } from '../menu-tab-fragmentation'
import { MenuTabExperienceMode } from '../menu-tab-experience-mode'
import { MenuTabDisplayMode } from '../menu-tab-display-mode'
import { MenuOfTunings } from '../menu-of-tunings'
import { MenuOfScales } from '../menu-of-scales'
import { MenuOfCovariants } from '../menu-of-covariants'
import { HarpFaces } from '../harp-faces'
import { CallbackOnSourceGlobalProps } from '../callback-on-sourceglobalprops'
import { ActivityLegend } from '../activity-legend'
import { getColors } from '../../utils'
import { MenuStates, MenuStashPosition, PageNumber } from '../../types'

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
    2: 1,
  } as const

  const styles = StyleSheet.create({
    fillScreen: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: getColors().pageColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <View style={styles.fillScreen}>
      <ActivityLegend />
      <ZoomSlideVertical />
      <HarpFaces />
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
        totalPages={2}
        stashPosition={MenuStashPosition.Seventh}
        getNextPage={() => pageOnDisplay.setValue(nextPageNumberMap[thisPage])}
      />
      <ToggleBufferFlusher />
      <CallbackOnSourceGlobalProps />
      <NotifyOfQuizQuestion isScreenFree={menuState === MenuStates.NoMenu} />
      <NotifyOfScale isScalesMenu={menuState === MenuStates.ScalesMenu} />
    </View>
  )
}
