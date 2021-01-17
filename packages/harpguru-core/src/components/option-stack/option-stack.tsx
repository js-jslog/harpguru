import { View } from 'react-native'
import React from 'react'

import { areOptionStacksEqual, getStyles } from './utils'
import { useFoundationAnimationValues } from './hooks'
import {
  TitleStack,
  ListStack,
  PreviousInStack,
  NextInStack,
} from './components'

import type { OptionStackProps } from './types'

const OptionStackLocal = (props: OptionStackProps): React.ReactElement => {
  const { stackState, stackStateTransition } = useFoundationAnimationValues()

  const titleStack = (
    <TitleStack {...props} transitionValue={stackStateTransition} />
  )
  const listStack = (
    <ListStack {...props} transitionValue={stackStateTransition} />
  )

  const styles = getStyles()
  return (
    <>
      <View style={styles.titleSection}>
        <PreviousInStack
          {...props}
          stateValue={stackState}
          transitionValue={stackStateTransition}
        />
        <View>{titleStack}</View>
        <NextInStack
          {...props}
          stateValue={stackState}
          transitionValue={stackStateTransition}
        />
      </View>
      <View style={styles.listSection}>{listStack}</View>
    </>
  )
}

export const OptionStack = React.memo(OptionStackLocal, areOptionStacksEqual)
