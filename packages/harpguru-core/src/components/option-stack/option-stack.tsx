import { View } from 'react-native'
import React from 'react'

import { OptionTitleStack } from '../option-title-stack'
import type { OptionTitleProps } from '../option-title'
import { OptionStackPointer } from '../option-stack-pointer'
import { OptionListStack } from '../option-list-stack'
import type { OptionListProps } from '../option-list'
import { getOptionStyles } from '../../utils'

import { areOptionStacksEqual } from './utils'
import { useFoundationAnimationValues } from './hooks'

type OptionProps = Omit<OptionTitleProps, 'transitionValue'> &
  Omit<OptionListProps, 'transitionValue'>

export type OptionStackProps = {
  readonly optionPropsz: ReadonlyArray<OptionProps>
}

export const OptionStack = (props: OptionStackProps): React.ReactElement => {
  const { stackState, stackStateTransition } = useFoundationAnimationValues()
  const {
    optionPropsz: { length: stackLength },
  } = props

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
        <>{titleStack}</>
      </View>
      <View style={styles.listSection}>{listStack}</View>
      <OptionStackPointer
        stackLength={stackLength}
        direction={'NEXT'}
        stateValue={stackState}
        transitionValue={stackStateTransition}
      />
      <OptionStackPointer
        stackLength={stackLength}
        direction={'PREVIOUS'}
        stateValue={stackState}
        transitionValue={stackStateTransition}
      />
    </>
  )
}

export const MemoOptionStack = React.memo(OptionStack, areOptionStacksEqual)
