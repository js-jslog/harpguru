import React from 'react'

import { OptionList } from '../option-list'
import type { OptionStackProps, WithTransition } from '../../types'
import { useInterpolateOptionStackTransitionValue } from '../../hooks'

export const OptionListStack = ({
  optionPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): React.ReactElement => {
  const listStack = optionPropsz.map((optionProps, index, array) => {
    return (
      <OptionList
        useItems={optionProps.useItems}
        twoColumns={optionProps.twoColumns}
        useLeftColumnLabel={optionProps.useLeftColumnLabel}
        useRightColumnLabel={optionProps.useRightColumnLabel}
        transitionValue={useInterpolateOptionStackTransitionValue(
          array.length,
          index,
          transitionValue
        )}
        key={index}
      />
    )
  })

  return <>{listStack}</>
}
