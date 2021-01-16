import React from 'react'

import { useInterpolateTransitionValue } from '../use-interpolate-transition-value'
import type {
  OptionStackProps,
  WithTransition,
  OptionProps_Scales,
  OptionProps_Dummy,
} from '../../types'
import { isOptionProps_Scales } from '../../types'
import { List } from '../../components'

export const useListStack = ({
  stackPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): ReadonlyArray<React.ReactElement> => {
  const listStack = stackPropsz.map((items, index, array) => {
    if (isOptionProps_Scales(items)) {
      const i = items as OptionProps_Scales
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
      const i = items as OptionProps_Dummy
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

  return listStack
}
