import Animated from 'react-native-reanimated'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { OptionTitleProps, WithTransition } from '../../types'

export const OptionTitle = ({
  useTitle,
  transitionValue,
}: OptionTitleProps & WithTransition): React.ReactElement => {
  const styles = getOptionStyles()
  const title = useTitle()
  return (
    <Animated.View
      style={[
        styles.titleWrapper,
        {
          opacity: transitionValue,
        },
      ]}
    >
      {title}
    </Animated.View>
  )
}
