import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import { getOptionSizes } from '../../utils'
import { useSizes, colors } from '../../styles'

type OptionBreakProps = {
  readonly title?: string
  readonly isTopPadded?: boolean
}

export const OptionBreak = ({
  title: titleText,
  isTopPadded,
}: OptionBreakProps): React.ReactElement => {
  const sizes = useSizes()
  const { ['5']: breakHeight, ['8']: titleSize, ['10']: breakWidth } = sizes
  const optionSizes = getOptionSizes()
  const marginSize = optionSizes.itemWidth / 4 - breakHeight / 2

  const { breakBar, breakWrapper, titleStyle } = StyleSheet.create({
    breakWrapper: {
      paddingTop: isTopPadded ? titleSize : 0,
      flexDirection: 'row',
    },
    titleStyle: {
      fontSize: titleSize,
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: colors.inertOutline,
      alignSelf: 'center',
      paddingRight: titleSize,
    },
    breakBar: {
      marginTop: marginSize,
      marginBottom: marginSize,
      height: breakHeight,
      width: breakWidth,
      backgroundColor: colors.inertOutline,
    },
  })
  return (
    <View style={breakWrapper}>
      <Text style={titleStyle}>{titleText}</Text>
      <View style={breakBar} />
    </View>
  )
}
