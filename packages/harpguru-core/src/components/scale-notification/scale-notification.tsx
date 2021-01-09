import { useGlobal } from 'reactn'
import { Text } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { NotificationFlash } from '../notification-flash'
import { useSizes } from '../../hooks'

import { getScaleLabel } from './utils'
import { useShouldDisplayScaleLabel } from './hooks'

export const ScaleNotification = (): ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { activeDegreeIds } = activeHarpStrata
  const scaleLabel = getScaleLabel(activeDegreeIds)

  const shouldDisplay = useShouldDisplayScaleLabel(scaleLabel)

  const sizes = useSizes()

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
