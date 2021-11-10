import { StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import type { MutableRefObject } from 'react'

import { getColors } from '../../utils'
import { useSizes } from '../../hooks'

type ZoomSlideLabelsProps = {
  readonly stateSetterRef: MutableRefObject<
    (arg0: readonly [number, number]) => void
  >
}
export const ZoomSlideLabels = ({
  stateSetterRef,
}: ZoomSlideLabelsProps): React.ReactElement => {
  const { dynamicSizes } = useSizes()
  const { inertOutline } = getColors()
  const styles = StyleSheet.create({
    textStyle: {
      color: inertOutline,
      fontSize: dynamicSizes['8'],
      alignSelf: 'center',
    },
  })
  const [[startHoleIndex, endHoleIndex], setColumnBounds] = useState<
    readonly [number, number]
  >([0, 0])
  stateSetterRef.current = (columnBounds: readonly [number, number]) =>
    setColumnBounds(columnBounds)

  const startHoleLabel = startHoleIndex + 1
  const endHoleLabel = endHoleIndex + 1

  return (
    <>
      <Text style={styles.textStyle}>{startHoleLabel}</Text>
      <Text style={styles.textStyle}>{endHoleLabel}</Text>
    </>
  )
}
