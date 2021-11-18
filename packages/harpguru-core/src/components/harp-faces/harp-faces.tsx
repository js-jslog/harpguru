import { useGlobal } from 'reactn'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { isChromaticHarpFace } from 'harpparts'

import { HarpFace } from '../harp-face'

export const HarpFaces = (): React.ReactElement => {
  const [fullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const { stack } = StyleSheet.create({
    stack: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
  if (isChromaticHarpFace(fullInteractionMatrix)) {
    return (
      <View style={stack}>
        <HarpFace harpfaceIndex={'harpface1'} />
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

// TODO: memoise this component to only return a new one if the number of harpfaces changes
