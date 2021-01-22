import React from 'react'

import { OptionListDouble } from '../option-list-double'
import type {
  OptionStackProps,
  WithTransition,
  OptionProps_Covariants,
  OptionProps_Scales,
  OptionProps_Apparatus,
} from '../../types'
import { isOptionProps_Covariants, isOptionProps_Scales } from '../../types'
import { useInterpolateOptionStackTransitionValue } from '../../hooks'

export const OptionListDoubleStack = ({
  optionPropsz,
  transitionValue,
}: OptionStackProps & WithTransition): React.ReactElement => {
  const listStack = optionPropsz.map((optionProps, index, array) => {
    if (isOptionProps_Covariants(optionProps)) {
      const covariantOptionProps = optionProps as OptionProps_Covariants
      return (
        <OptionListDouble
          optionType={covariantOptionProps.optionType}
          useItems={covariantOptionProps.useItems}
          twoColumns={covariantOptionProps.twoColumns}
          itemTapHandler={covariantOptionProps.itemTapHandler}
          useLeftColumnLabel={covariantOptionProps.useLeftColumnLabel}
          useRightColumnLabel={covariantOptionProps.useRightColumnLabel}
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
        <OptionListDouble
          optionType={scalesOptionProps.optionType}
          useItems={scalesOptionProps.useItems}
          twoColumns={scalesOptionProps.twoColumns}
          itemTapHandler={scalesOptionProps.itemTapHandler}
          useLeftColumnLabel={scalesOptionProps.useLeftColumnLabel}
          useRightColumnLabel={scalesOptionProps.useRightColumnLabel}
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
        <OptionListDouble
          optionType={apparatusOptionProps.optionType}
          useItems={apparatusOptionProps.useItems}
          twoColumns={apparatusOptionProps.twoColumns}
          itemTapHandler={apparatusOptionProps.itemTapHandler}
          useLeftColumnLabel={apparatusOptionProps.useLeftColumnLabel}
          useRightColumnLabel={apparatusOptionProps.useRightColumnLabel}
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
