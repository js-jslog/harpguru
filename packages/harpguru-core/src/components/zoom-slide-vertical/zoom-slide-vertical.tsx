import React from 'react'

import { ZoomSlideVerticalVisible } from '../zoom-slide-vertical-visible'
import { useIsZoomedColumnBounds } from '../../hooks'

export const ZoomSlideVertical = (): React.ReactElement => {
  const isZoomedColumBounds = useIsZoomedColumnBounds()
  if (isZoomedColumBounds === false) return <></>

  return <ZoomSlideVerticalVisible columnBounds={isZoomedColumBounds} />
}
