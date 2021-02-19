import { StyleSheet, View } from 'react-native'
import React from 'react'

import { getOptionSizes } from '../../utils'
import { getSizes, colors } from '../../styles'

export const OptionBreak = (): React.ReactElement => {
  const sizes = getSizes()
  const { ['5']: breakHeight, ['10']: breakWidth } = sizes
  const optionSizes = getOptionSizes()
  const marginSize = optionSizes.itemWidth / 4 - breakHeight / 2

  const { itemAlignment } = StyleSheet.create({
    itemAlignment: {
      marginTop: marginSize,
      marginBottom: marginSize,
      height: breakHeight,
      width: breakWidth,
      backgroundColor: colors.inertOutline,
    },
  })
  return <View style={itemAlignment} />
}
