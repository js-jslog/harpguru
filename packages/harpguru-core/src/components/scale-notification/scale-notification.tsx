import { Text } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { NotificationFlash } from '../notification-flash'
import { getSizes } from '../../styles'

import { useScaleLabelForNotification } from './hooks'

export const ScaleNotification = (): ReactElement => {
  const scaleLabel = useScaleLabelForNotification()

  const sizes = getSizes()

  return (
    <NotificationFlash shouldDisplay={scaleLabel !== undefined}>
      <Text
        style={{
          color: 'black',
          textShadowColor: 'white',
          textShadowRadius: 1,
          fontSize: sizes['8'],
        }}
      >
        {scaleLabel || 'test'}
      </Text>
    </NotificationFlash>
  )
}
