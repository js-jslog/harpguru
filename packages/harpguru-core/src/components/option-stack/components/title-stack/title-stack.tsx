import React from 'react'

import { Title } from '../title'
import type { OptionStackProps, WithTransition } from '../../types'
import { useInterpolateTransitionValue } from '../../hooks'

export const TitleStack = ({
  optionPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): React.ReactElement => {
  const titleStack = optionPropsz.map((optionProps, index, array) => {
    return (
      <Title
        title={optionProps.title}
        useSubTitle={optionProps.useSubTitle}
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
