import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { Text } from 'react-native'
import React from 'react'

import { getStyles } from '../../utils'
import type { TitleProps, WithTransition } from '../../types'

export const Title = ({
  title,
  transitionValue,
}: TitleProps & WithTransition): React.ReactElement => {
  const styles = getStyles()
  const [
    {
      apparatus: { id: apparatusId },
    },
  ] = useGlobal('activeHarpStrata')

  return (
    <Animated.View
      style={[
        styles.titleWrapper,
        {
          opacity: transitionValue,
        },
      ]}
    >
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subTitleText}>{apparatusId}</Text>
    </Animated.View>
  )
}
