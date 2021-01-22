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
          useItems={covariantsOptionProps.useItems}
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
          useItems={scalesOptionProps.useItems}
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
          useItems={apparatusOptionProps.useItems}
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
