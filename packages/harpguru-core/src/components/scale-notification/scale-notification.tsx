import { useGlobal } from 'reactn'
import { Text } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import { getScaleByDegreeIds } from 'harpparts'

import { NotificationFlash } from '../notification-flash'
import { getSizes } from '../../styles'

import { useShouldDisplayScaleLabel } from './hooks'

type ScaleNotificationProps = {
  readonly isScalesMenu: boolean
}

export const ScaleNotification = ({
  isScalesMenu,
}: ScaleNotificationProps): ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { activeDegreeIds } = activeHarpStrata
  const { label: scaleLabel } = getScaleByDegreeIds(activeDegreeIds) || {}

  const shouldDisplay = useShouldDisplayScaleLabel(scaleLabel, isScalesMenu)

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
