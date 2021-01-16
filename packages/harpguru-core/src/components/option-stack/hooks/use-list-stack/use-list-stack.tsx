import React from 'react'

import { useInterpolateTransitionValue } from '../use-interpolate-transition-value'
import type {
  OptionStackProps,
  WithTransition,
  OptionProps_Scales,
  OptionProps_Dummy,
} from '../../types'
import { List } from '../../components'

export const useListStack = ({
  stackPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): ReadonlyArray<React.ReactElement> => {
  function isDummy(
    x: OptionProps_Scales | OptionProps_Dummy
  ): x is OptionProps_Dummy {
    return x.title === 'TOTAL_DUMMY'
  }

  const listStack = stackPropsz.map((items, index, array) => {
    if (isDummy(items)) {
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
    } else {
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
    }
  })

  return listStack
}
