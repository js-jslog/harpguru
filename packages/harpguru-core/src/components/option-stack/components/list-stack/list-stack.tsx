import React from 'react'

import { List } from '../list'
import type {
  OptionStackProps,
  WithTransition,
  OptionProps_Scales,
  OptionProps_Dummy,
} from '../../types'
import { isOptionProps_Scales } from '../../types'
import { useInterpolateTransitionValue } from '../../hooks'

export const ListStack = ({
  stackPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): React.ReactElement => {
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

  return <>{listStack}</>
}
