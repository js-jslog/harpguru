import { View } from 'react-native'
import React from 'react'

import { OptionTitleStack } from '../option-title-stack'
import { OptionStackPrevious } from '../option-stack-previous'
import { OptionStackNext } from '../option-stack-next'
import { OptionListStack } from '../option-list-stack'
import { getOptionStyles } from '../../utils'
import type { OptionStackProps } from '../../types'

import { areOptionStacksEqual } from './utils'
import { useFoundationAnimationValues } from './hooks'

export const OptionStack = (props: OptionStackProps): React.ReactElement => {
  const { stackState, stackStateTransition } = useFoundationAnimationValues()

  const titleStack = (
    <OptionTitleStack {...props} transitionValue={stackStateTransition} />
  )
  const listStack = (
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
