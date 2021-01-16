import type { Node } from 'react-native-reanimated'
import React from 'react'

import { useInterpolateTransitionValue } from '../use-interpolate-transition-value'
import type { OptionStackProps } from '../../types'
import { Title } from '../../components'

export const useTitleStack = (
  { stackPropsz }: OptionStackProps,
  foundationTransitionValue: Node<number>
): ReadonlyArray<React.ReactElement> => {
  const titleStack = stackPropsz.map((stackProps, index, array) => {
    return (
      <Title
        title={stackProps.title}
        animationValue={useInterpolateTransitionValue(
          array.length,
          index,
          foundationTransitionValue
        )}
        key={index}
      />
    )
  })

  return titleStack
}
