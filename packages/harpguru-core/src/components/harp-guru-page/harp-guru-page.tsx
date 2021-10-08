import 'react-native-gesture-handler'

import type { Value } from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { ToggleBufferFlusher } from '../toggle-buffer-flusher'
import { HarpGuruMenus } from '../harp-guru-menus'
import { HarpFaceMemo } from '../harp-face'
import { CallbackOnSourceGlobalProps } from '../callback-on-sourceglobalprops'
import { ActivityLegend } from '../activity-legend'
import { getColors } from '../../utils'
import { PageNumber } from '../../types'

type HarpGuruPageProps = {
  readonly pageOnDisplay: Value<PageNumber>
  readonly thisPage: PageNumber
}

export const HarpGuruPage = (props: HarpGuruPageProps): ReactElement => {
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
      <HarpFaceMemo />
      <HarpGuruMenus {...props} />
      <ToggleBufferFlusher />
      <CallbackOnSourceGlobalProps />
    </View>
  )
}
