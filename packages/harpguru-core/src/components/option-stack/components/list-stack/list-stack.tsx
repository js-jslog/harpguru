import React from 'react'

import { List } from '../list'
import type {
  OptionStackProps,
  WithTransition,
  OptionProps_Covariants,
  OptionProps_Scales,
  OptionProps_Apparatus,
} from '../../types'
import { isOptionProps_Covariants, isOptionProps_Scales } from '../../types'
import { useInterpolateTransitionValue } from '../../hooks'

export const ListStack = ({
  optionPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): React.ReactElement => {
  const listStack = optionPropsz.map((optionProps, index, array) => {
    if (isOptionProps_Covariants(optionProps)) {
      const scalesOptionProps = optionProps as OptionProps_Covariants
      return (
        <List
          items={scalesOptionProps.items}
          transitionValue={useInterpolateTransitionValue(
            array.length,
            index,
            transitionValue
          )}
          itemTapHandler={scalesOptionProps.itemTapHandler}
          key={index}
        />
      )
    } else if (isOptionProps_Scales(optionProps)) {
      const scalesOptionProps = optionProps as OptionProps_Scales
      return (
        <List
          items={scalesOptionProps.items}
          transitionValue={useInterpolateTransitionValue(
            array.length,
            index,
            transitionValue
          )}
          itemTapHandler={scalesOptionProps.itemTapHandler}
          key={index}
        />
      )
    } else {
      const apparatusOptionProps = optionProps as OptionProps_Apparatus
      return (
        <List
          items={apparatusOptionProps.items}
          transitionValue={useInterpolateTransitionValue(
            array.length,
            index,
            transitionValue
          )}
          itemTapHandler={apparatusOptionProps.itemTapHandler}
          key={index}
        />
      )
    }
  })

  return <>{listStack}</>
}
