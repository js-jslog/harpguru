import { useGlobal } from 'reactn'
import { StyleSheet, View } from 'react-native'
import React from 'react'

import { getColors } from '../../utils'
import { getWindowDimensions } from '../../packages/get-window-dimensions'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'
import { useSizes } from '../../hooks'

export const ZoomSlideVerticalNew = (): React.ReactElement => {
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

type ZoomSlideVerticalVisibleProps = {
  readonly restrictingColumnBounds: readonly [number, number]
  readonly totalHoles: number
}
const ZoomSlideVerticalVisible = (
  props: ZoomSlideVerticalVisibleProps
): React.ReactElement => {
  const { restrictingColumnBounds: columnBounds, totalHoles } = props
  const { dynamicSizes } = useSizes()
  const { inertOutline } = getColors()
  const { shortEdge } = getWindowDimensions()
  const unitSize = shortEdge / totalHoles
  const [startHole, endHole] = columnBounds
  const holeSpan = endHole - startHole
  const indicatorHeight = unitSize * holeSpan
  const styles = StyleSheet.create({
    componentWrapper: {
      ...StyleSheet.absoluteFillObject,
      width: dynamicSizes.zoomSlideWidth,
      left: dynamicSizes['9'], // legend width is going to have to become a named variable
    },
    sliderWrapper: {
      backgroundColor: inertOutline,
      width: dynamicSizes.zoomSlideWidth,
      height: indicatorHeight,
    },
  })

  return (
    <View style={styles.componentWrapper}>
      <View style={styles.sliderWrapper} />
    </View>
  )
}
