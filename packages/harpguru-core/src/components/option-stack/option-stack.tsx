import { View } from 'react-native'
import React from 'react'

import { OptionTitleStack } from '../option-title-stack'
import { OptionStackPrevious } from '../option-stack-previous'
import { OptionStackNext } from '../option-stack-next'
import { OptionListStack } from '../option-list-stack'
import { OptionListDoubleStack } from '../option-list-double-stack'
import { getOptionStyles } from '../../utils'
import type { OptionStackProps } from '../../types'

import { areOptionStacksEqual } from './utils'
import { useFoundationAnimationValues } from './hooks'

export const OptionStack = (props: OptionStackProps): React.ReactElement => {
  const { stackState, stackStateTransition } = useFoundationAnimationValues()

  const titleStack = (
    <OptionTitleStack {...props} transitionValue={stackStateTransition} />
  )
  // TODO: It is not good to presume. The reason for this implementation is
  // because we are caught between two places at the moment. On the one hand
  // it seems like the correct implementation will be to allow the lists to
  // render themselves as either 2 or 1 columns components. While I have this
  // defensive implementation where the double column list is distinct from
  // the single column list though, we need to make the presumption at this
  // layer.
  const {
    optionPropsz: {
      [0]: { twoColumns: presumeAllTwoColumns },
    },
  } = props
  const listStack = presumeAllTwoColumns ? (
    <OptionListDoubleStack {...props} transitionValue={stackStateTransition} />
  ) : (
    <OptionListStack {...props} transitionValue={stackStateTransition} />
  )

  const styles = getOptionStyles()
  return (
    <>
      <View style={styles.titleSection}>
        <OptionStackPrevious
          {...props}
          stateValue={stackState}
          transitionValue={stackStateTransition}
        />
        <View>{titleStack}</View>
        <OptionStackNext
          {...props}
          stateValue={stackState}
          transitionValue={stackStateTransition}
        />
      </View>
      <View style={styles.listSection}>{listStack}</View>
    </>
  )
}

export const MemoOptionStack = React.memo(OptionStack, areOptionStacksEqual)
