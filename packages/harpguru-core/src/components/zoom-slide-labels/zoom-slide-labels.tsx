import { useGlobal } from 'reactn'
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import type { MutableRefObject } from 'react'

import { TextWithoutOSScale } from '../text-without-os-scale'
import { getColors } from '../../utils'

type ZoomSlideLabelsProps = {
  readonly stateSetterRef: MutableRefObject<
    (arg0: readonly [number, number]) => void
  >
}
export const ZoomSlideLabels = ({
  stateSetterRef,
}: ZoomSlideLabelsProps): React.ReactElement => {
  const [dynamicSizes] = useGlobal('dynamicSizes')
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
      <TextWithoutOSScale style={styles.textStyle}>
        {startHoleLabel}
      </TextWithoutOSScale>
      <TextWithoutOSScale style={styles.textStyle}>
        {endHoleLabel}
      </TextWithoutOSScale>
    </>
  )
}
