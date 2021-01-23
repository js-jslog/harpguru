import React from 'react'

import { OptionTitle } from '../option-title'
import type { OptionStackProps, WithTransition } from '../../types'
import { useInterpolateOptionStackTransitionValue } from '../../hooks'

export const OptionTitleStack = ({
  optionPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): React.ReactElement => {
  const titleStack = optionPropsz.map((optionProps, index, array) => {
    return (
      <OptionTitle
        useTitle={optionProps.useTitle}
        transitionValue={useInterpolateOptionStackTransitionValue(
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
