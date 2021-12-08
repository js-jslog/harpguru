import { useGlobal } from 'reactn'
import { Text } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import { getScaleByDegreeIds } from 'harpparts'

import { NotificationFlash } from '../notification-flash'

import { useShouldDisplayScaleLabel } from './hooks'

type NotifyOfScaleProps = {
  readonly isScalesMenu: boolean
}

export const NotifyOfScale = ({
  isScalesMenu,
}: NotifyOfScaleProps): ReactElement => {
  const [activeDegreeIds] = useGlobal('activeDegreeIds')
  const { label: scaleLabel } = getScaleByDegreeIds(activeDegreeIds) || {}

  const shouldDisplay = useShouldDisplayScaleLabel(scaleLabel, isScalesMenu)

  const [staticSizes] = useGlobal('staticSizes')

  return (
    <NotificationFlash shouldDisplay={shouldDisplay}>
      <Text
        style={{
          color: 'black',
          fontSize: staticSizes['8'],
        }}
      >
        {scaleLabel}
      </Text>
    </NotificationFlash>
  )
}
