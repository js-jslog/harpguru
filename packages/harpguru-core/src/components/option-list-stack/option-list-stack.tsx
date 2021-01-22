import React from 'react'

import { OptionList } from '../option-list'
import type {
  OptionStackProps,
  WithTransition,
  OptionProps_Covariants,
  OptionProps_Scales,
  OptionProps_Apparatus,
} from '../../types'
import { isOptionProps_Covariants, isOptionProps_Scales } from '../../types'
import { useInterpolateOptionStackTransitionValue } from '../../hooks'

export const OptionListStack = ({
  optionPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): React.ReactElement => {
  const listStack = optionPropsz.map((optionProps, index, array) => {
    if (isOptionProps_Covariants(optionProps)) {
      const covariantsOptionProps = optionProps as OptionProps_Covariants
      return (
        <OptionList
          optionType={covariantsOptionProps.optionType}
          items={covariantsOptionProps.items}
          twoColumns={covariantsOptionProps.twoColumns}
          itemTapHandler={covariantsOptionProps.itemTapHandler}
          transitionValue={useInterpolateOptionStackTransitionValue(
            array.length,
            index,
            transitionValue
          )}
          key={index}
        />
      )
    } else if (isOptionProps_Scales(optionProps)) {
      const scalesOptionProps = optionProps as OptionProps_Scales
      return (
        <OptionList
          optionType={scalesOptionProps.optionType}
          items={scalesOptionProps.items}
          twoColumns={scalesOptionProps.twoColumns}
          itemTapHandler={scalesOptionProps.itemTapHandler}
          transitionValue={useInterpolateOptionStackTransitionValue(
            array.length,
            index,
            transitionValue
          )}
          key={index}
        />
      )
    } else {
      const apparatusOptionProps = optionProps as OptionProps_Apparatus
      return (
        <OptionList
          optionType={apparatusOptionProps.optionType}
          items={apparatusOptionProps.items}
          twoColumns={apparatusOptionProps.twoColumns}
          itemTapHandler={apparatusOptionProps.itemTapHandler}
          transitionValue={useInterpolateOptionStackTransitionValue(
            array.length,
            index,
            transitionValue
          )}
          key={index}
        />
      )
    }
  })

  return <>{listStack}</>
}
