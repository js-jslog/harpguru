import 'react-native-gesture-handler'

import { useGlobal } from 'reactn'
import React from 'react'

import { ZoomSlideVerticalVisible } from '../zoom-slide-vertical-visible'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'

export const ZoomSlideVertical = (): React.ReactElement => {
  const [columnBounds] = useGlobal('columnBounds')
  const [fullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const [viewableInteractionMatrix] = useGlobal('viewableInteractionMatrix')
  if (columnBounds === 'FIT') return <></>
  if (
    doSparceIdedObjectMatricesMatch(
      fullInteractionMatrix,
      viewableInteractionMatrix
    )
  )
    return <></>

  return (
    <ZoomSlideVerticalVisible
      restrictingColumnBounds={columnBounds}
      totalHoles={fullInteractionMatrix[0].length}
    />
  )
}
