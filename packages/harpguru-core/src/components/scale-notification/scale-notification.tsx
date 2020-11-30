import { useGlobal, useState } from 'reactn'
import { Text } from 'react-native'
import React, { useEffect } from 'react'
import type { ReactElement } from 'react'

import { NotificationFlash } from '../notification-flash'
import { getSizes } from '../../styles'
import { usePrevious } from '../../hooks'

import { doScalesMatch, getScaleLabel } from './utils'

export const ScaleNotification = (): ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { activeDegreeIds } = activeHarpStrata
  const previousActiveDegreeIds = usePrevious(activeDegreeIds, activeDegreeIds)

  const [shouldDisplay, setShouldDisplay] = useState(false)

  const isNewScale =
    previousActiveDegreeIds === undefined
      ? false
      : !doScalesMatch(activeDegreeIds, previousActiveDegreeIds)

  const scaleLabel = getScaleLabel(activeDegreeIds)

  useEffect(() => {
    if (scaleLabel === undefined) return
    if (isNewScale === true) {
      setShouldDisplay(true)
      const finishShowing = setTimeout(() => {
        setShouldDisplay(false)
      }, 500)
      return () => clearTimeout(finishShowing)
    }
    if (isNewScale === false && shouldDisplay === true) {
      const finishShowing = setTimeout(() => {
        setShouldDisplay(false)
      }, 500)
      return () => clearTimeout(finishShowing)
    }
    return
  }, [isNewScale, scaleLabel, shouldDisplay])

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
        {scaleLabel || 'test'}
      </Text>
    </NotificationFlash>
  )
}
