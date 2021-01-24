import Animated from 'react-native-reanimated'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { WithTransition } from '../../types'

export type OptionTitleProps = {
  readonly useTitle: () => React.ReactElement
}

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
