import React from 'react'

import { OptionListDouble } from '../option-list-double'
import type { OptionStackProps, WithTransition } from '../../types'
import { useInterpolateOptionStackTransitionValue } from '../../hooks'

export const OptionListDoubleStack = ({
  optionPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): React.ReactElement => {
  const listStack = optionPropsz.map((optionProps, index, array) => {
    return (
      <OptionListDouble
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
