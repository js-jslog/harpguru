import { useDerivedValue } from 'react-native-reanimated'
import React from 'react'

import type { OptionStackProps } from '../option-stack'
import { OptionList } from '../option-list'
import type { WithTransition } from '../../types'
import { useInterpolateOptionStackTransitionValue } from '../../hooks'

export const OptionListStack = ({
  optionPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): React.ReactElement => {
  const listStack = optionPropsz.map((optionProps, index, array) => {
    const derivedTransitionValue = useDerivedValue(() =>
      useInterpolateOptionStackTransitionValue(
        array.length,
        index,
        transitionValue.value
      )
    )
    return (
      <OptionList
        useItems={optionProps.useItems}
        twoColumns={optionProps.twoColumns}
        useLeftColumnLabel={optionProps.useLeftColumnLabel}
        useRightColumnLabel={optionProps.useRightColumnLabel}
        transitionValue={derivedTransitionValue}
        key={index}
      />
    )
  })

  return <>{listStack}</>
}
