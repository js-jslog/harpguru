import { useDerivedValue } from 'react-native-reanimated'
import React from 'react'

import { OptionTitle } from '../option-title'
import type { OptionStackProps } from '../option-stack'
import type { WithTransition } from '../../types'
import { useInterpolateOptionStackTransitionValue } from '../../hooks'

export const OptionTitleStack = ({
  optionPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): React.ReactElement => {
  const titleStack = optionPropsz.map((optionProps, index, array) => {
    const derivedTransitionValue = useDerivedValue(() =>
      useInterpolateOptionStackTransitionValue(
        array.length,
        index,
        transitionValue.value
      )
    )
    return (
      <OptionTitle
        useTitle={optionProps.useTitle}
        transitionValue={derivedTransitionValue}
        key={index}
      />
    )
  })

  return <>{titleStack}</>
}
