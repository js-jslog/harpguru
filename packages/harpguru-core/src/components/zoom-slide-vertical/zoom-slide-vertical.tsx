import 'react-native-gesture-handler'

import { useGlobal } from 'reactn'
import React from 'react'

import { ZoomSlideVerticalVisible } from '../zoom-slide-vertical-visible'
import { useIsZoomed } from '../../hooks'

export const ZoomSlideVertical = (): React.ReactElement => {
  const [fullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  if (!useIsZoomed()) return <></>

  // We can assume that this is not 'FIT' because we have
  // returned false from useIsZoomed. This is not a self
  // evident inferance though and it would be better if
  // there were some kind of typeguard
  const [columnBounds] = useGlobal('columnBounds')
  return (
    <ZoomSlideVerticalVisible
      columnBounds={columnBounds as readonly [number, number]}
      columnCount={fullInteractionMatrix[0].length}
    />
  )
}
