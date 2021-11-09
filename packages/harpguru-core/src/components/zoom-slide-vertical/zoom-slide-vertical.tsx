import 'react-native-gesture-handler'

import { useGlobal } from 'reactn'
import React from 'react'

import { ZoomSlideVerticalVisible } from '../zoom-slide-vertical-visible'
import { useIsZoomedColumnBounds } from '../../hooks'

export const ZoomSlideVertical = (): React.ReactElement => {
  const [fullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const isZoomedColumBounds = useIsZoomedColumnBounds()
  if (isZoomedColumBounds === false) return <></>

  return (
    <ZoomSlideVerticalVisible
      columnBounds={isZoomedColumBounds}
      columnCount={fullInteractionMatrix[0].length}
    />
  )
}
