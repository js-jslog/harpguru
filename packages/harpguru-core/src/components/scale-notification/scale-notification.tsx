import { useGlobal } from 'reactn'
import { Text } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import { getScaleByDegreeIds } from 'harpparts'

import { NotificationFlash } from '../notification-flash'
import { getSizes } from '../../styles'

import { useShouldDisplayScaleLabel } from './hooks'

export const ScaleNotification = (): ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { activeDegreeIds } = activeHarpStrata
  // TODO: this function should probably return a scale now
  // rather than just the label.
  const scaleLabel = getScaleByDegreeIds(activeDegreeIds)

  const shouldDisplay = useShouldDisplayScaleLabel(scaleLabel)

  const sizes = getSizes()

  return (
    <NotificationFlash shouldDisplay={shouldDisplay}>
      <Text
        style={{
          color: 'black',
          textShadowColor: 'white',
          textShadowRadius: 1,
          fontSize: sizes['8'],
        }}
      >
        {scaleLabel}
      </Text>
    </NotificationFlash>
  )
}
