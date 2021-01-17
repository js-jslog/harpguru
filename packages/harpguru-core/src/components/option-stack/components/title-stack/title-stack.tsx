import React from 'react'

import { Title } from '../title'
import type { OptionStackProps, WithTransition } from '../../types'
import { useInterpolateTransitionValue } from '../../hooks'

export const TitleStack = ({
  stackPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): React.ReactElement => {
  const titleStack = stackPropsz.map((stackProps, index, array) => {
    return (
      <Title
        title={stackProps.title}
        useSubTitle={stackProps.useSubTitle}
        transitionValue={useInterpolateTransitionValue(
          array.length,
          index,
          transitionValue
        )}
        key={index}
      />
    )
  })

  return <>{titleStack}</>
}
