import { StyleSheet, Text } from 'react-native'
import React, { useState, MutableRefObject } from 'react'

import { getColors } from '../../utils'
import { useSizes } from '../../hooks'

type ZoomSlideLabelsProps = {
  readonly stateSetterRef: MutableRefObject<(arg0: number) => void>
  readonly slideSpan: number
}
export const ZoomSlideLabels = ({
  stateSetterRef,
  slideSpan,
}: ZoomSlideLabelsProps): React.ReactElement => {
  const { dynamicSizes } = useSizes()
  const { pageColor } = getColors()
  const styles = StyleSheet.create({
    textStyle: {
      color: pageColor,
      fontSize: dynamicSizes['8'],
      alignSelf: 'center',
    },
  })
  const [startHoleIndex, setStartHoleIndex] = useState(2)
  stateSetterRef.current = (slotIndex: number) => setStartHoleIndex(slotIndex)

  const startHoleLabel = startHoleIndex + 1
  const endHoleLabel = startHoleLabel + slideSpan

  return (
    <>
      <Text style={styles.textStyle}>{startHoleLabel}</Text>
      <Text style={styles.textStyle}>{endHoleLabel}</Text>
    </>
  )
}
