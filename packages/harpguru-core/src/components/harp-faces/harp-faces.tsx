import { useGlobal } from 'reactn'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { isChromaticHarpFace } from 'harpparts'

import { HarpFace } from '../harp-face'
import { useSizes } from '../../hooks'

export const HarpFaces = (): React.ReactElement => {
  const [fullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const {
    dynamicSizes: { fragmentGutter },
  } = useSizes()
  const { stack, gutter } = StyleSheet.create({
    stack: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    gutter: {
      height: fragmentGutter,
    },
  })
  if (isChromaticHarpFace(fullInteractionMatrix)) {
    return (
      <View style={stack}>
        <HarpFace harpfaceIndex={'harpface1'} />
        <View style={gutter} />
        <HarpFace harpfaceIndex={'harpface2'} />
      </View>
    )
  }
  return (
    <View style={stack}>
      <HarpFace harpfaceIndex={'harpface1'} />
    </View>
  )
}
