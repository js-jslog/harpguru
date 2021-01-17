import React from 'react'

import { List } from '../list'
import type {
  OptionStackProps,
  WithTransition,
  OptionProps_Scales,
  OptionProps_Apparatus,
} from '../../types'
import { isOptionProps_Scales } from '../../types'
import { useInterpolateTransitionValue } from '../../hooks'

export const ListStack = ({
  optionPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): React.ReactElement => {
  const listStack = optionPropsz.map((optionProps, index, array) => {
    if (isOptionProps_Scales(optionProps)) {
      const i = optionProps as OptionProps_Scales
      return (
        <List
          items={i.items}
          transitionValue={useInterpolateTransitionValue(
            array.length,
            index,
            transitionValue
          )}
          itemTapHandler={i.itemTapHandler}
          key={index}
        />
      )
    } else {
      const i = optionProps as OptionProps_Apparatus
      return (
        <List
          items={i.items}
          transitionValue={useInterpolateTransitionValue(
            array.length,
            index,
            transitionValue
          )}
          itemTapHandler={i.itemTapHandler}
          key={index}
        />
      )
    }
  })

  return <>{listStack}</>
}
