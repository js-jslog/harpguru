import Animated from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import React from 'react'

import type { WithTransition } from '../../types'
import { useOptionSizes } from '../../hooks'

export type OptionTitleProps = WithTransition & {
  readonly useTitle: () => React.ReactElement
}

export const OptionTitle = ({
  useTitle,
  transitionValue,
}: OptionTitleProps): React.ReactElement => {
  const title = useTitle()

  const styles = useOptionSizes()
  const { wrapper, gutterSpacer } = StyleSheet.create({
    wrapper: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    gutterSpacer: {
      position: 'absolute',
      left: styles.smallGutterDynamic,
    },
  })
  return (
    <Animated.View style={[wrapper, { opacity: transitionValue }]}>
      <View style={gutterSpacer}>{title}</View>
    </Animated.View>
  )
}
