import { View } from 'react-native'
import React from 'react'

import { getStyles } from './utils'
import {
  useFoundationAnimationValues,
  useTitleStack,
  useListStack,
} from './hooks'
import { PreviousInStack, NextInStack } from './components'

import type { OptionStackProps } from './types'

const OptionStackLocal = (props: OptionStackProps): React.ReactElement => {
  const { stackState, stackStateTransition } = useFoundationAnimationValues()

  const titleStack = useTitleStack(props, stackStateTransition)
  const listStack = useListStack(props, stackStateTransition)

  const styles = getStyles()
  return (
    <>
      <View style={styles.titleSection}>
        <PreviousInStack {...props} activeLayerValue={stackState} />
        <View>{titleStack}</View>
        <NextInStack {...props} activeLayerValue={stackState} />
      </View>
      <View style={styles.listSection}>{listStack}</View>
    </>
  )
}

const areEqual = (
  { stackPropsz: prevProps }: OptionStackProps,
  { stackPropsz: nextProps }: OptionStackProps
) => {
  // TODO: Add more tests
  // Tests whether another list has been added to the stack
  if (prevProps.length !== nextProps.length) return false
  // If we want to include this test then we need to ensure that React.useCallback
  // wraps the tap handlers being passed in.
  if (prevProps[0].itemTapHandler !== nextProps[0].itemTapHandler) return false
  return true
}

export const OptionStack = React.memo(OptionStackLocal, areEqual)
