import Animated from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import React from 'react'

import { getOptionSizes } from '../../utils'
import type { WithTransition } from '../../types'

export type OptionTitleProps = WithTransition & {
  readonly useTitle: () => React.ReactElement
}

export const OptionTitle = ({
  useTitle,
  transitionValue,
}: OptionTitleProps): React.ReactElement => {
  const styles = getOptionSizes()
  const title = useTitle()
  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          alignItems: 'flex-start',
          justifyContent: 'center',
          opacity: transitionValue,
        },
      ]}
    >
      <View
        style={{
          position: 'absolute',
          left: styles.smallGutter,
        }}
      >
        {title}
      </View>
    </Animated.View>
  )
}
