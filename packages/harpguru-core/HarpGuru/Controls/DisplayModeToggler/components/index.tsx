import { View, Button } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { DisplayModeTogglerProps } from '../types'
import { DisplayModes } from '../../../HarpFace'

export function DisplayModeToggler(props: DisplayModeTogglerProps): ReactElement {
  const { setActiveDisplayMode } = props
  return (
    <View accessibilityLabel='Display mode'>
      <Button accessibilityLabel={DisplayModes.Degree} onPress={(): void => setActiveDisplayMode(DisplayModes.Degree)} title={DisplayModes.Degree} />
      <Button accessibilityLabel={DisplayModes.Pitch} onPress={(): void => setActiveDisplayMode(DisplayModes.Pitch)} title={DisplayModes.Pitch} />
    </View>
  )
}
