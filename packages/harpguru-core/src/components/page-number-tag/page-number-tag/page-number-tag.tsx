import { View, Text } from 'react-native'
import React from 'react'

import { colors, harpguruColors, getSizes } from '../../../styles'

type PageNumberTagProps = {
  readonly thisPage: number
  readonly totalPages: number
}
export const PageNumberTag = ({
  thisPage,
  totalPages,
}: PageNumberTagProps): React.ReactElement => {
  const sizes = getSizes()

  return (
    <View
      style={{
        zIndex: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: harpguruColors.gold,
        width: sizes['9'],
        height: sizes['8'],
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
        }}
      >
        <Text
          style={{
            fontSize: sizes['8'],
            color: colors.pageColor,
          }}
        >
          {thisPage}
        </Text>
        <Text
          style={{
            fontSize: sizes['7'],
            color: colors.pageColor,
          }}
        >
          of {totalPages}
        </Text>
      </View>
    </View>
  )
}
