import React from 'react'

import { useInterpolateTransitionValue } from '../use-interpolate-transition-value'
import type { OptionStackProps, WithTransition } from '../../types'
import { Title } from '../../components'

export const useTitleStack = ({
  stackPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): ReadonlyArray<React.ReactElement> => {
  const titleStack = stackPropsz.map((stackProps, index, array) => {
    return (
      <Title
        title={stackProps.title}
        transitionValue={useInterpolateTransitionValue(
          array.length,
          index,
          transitionValue
        )}
        key={index}
      />
    )
  })

  return titleStack
}
