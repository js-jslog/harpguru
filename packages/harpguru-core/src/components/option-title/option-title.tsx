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
  const title = useTitle()

  const styles = getOptionSizes()
  const { wrapper, gutterSpacer } = StyleSheet.create({
    wrapper: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    gutterSpacer: {
      position: 'absolute',
      left: styles.smallGutter,
    },
  })
  return (
    <Animated.View style={[wrapper, { opacity: transitionValue }]}>
      <View style={gutterSpacer}>{title}</View>
    </Animated.View>
  )
}
