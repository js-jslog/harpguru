import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { View, Text } from 'react-native'
import React from 'react'

import { OptionValue } from '../option-value'
import type { OptionIds, ChildrenProps } from '../../types'
import { usePrevious } from '../../hooks'

import { setOptionsInListOfSix } from './utils'
import { getStyles } from './option-styles'

type OptionProps = {
  readonly title: string
  readonly activeOptionId: OptionIds
  readonly orderedOptionIds: ReadonlyArray<OptionIds>
  readonly nudgeFunction: (arg0: 'UP' | 'DOWN') => void
  readonly setFunction: (arg0: OptionIds) => void
}

const OptionTitle = ({ children }: ChildrenProps): React.ReactElement => {
  const styles = getStyles()
  return <Text style={styles.optionTitle}>{children}</Text>
}

export const Option = (props: OptionProps): React.ReactElement => {
  const styles = getStyles()

  const { title, activeOptionId, orderedOptionIds, setFunction } = props

  const previousOptionId = usePrevious(activeOptionId, undefined)
  const isUpdated = activeOptionId !== previousOptionId
  const optionUpdatedVal = useTimingTransition(isUpdated, {
    duration: 300,
    easing: Easing.inOut(Easing.circle),
  })
  const optionUpdateTransition = interpolate(optionUpdatedVal, {
    inputRange: [0, 1],
    outputRange: isUpdated ? [2, 1] : [1, 1],
  })

  const visibleOptionList = setOptionsInListOfSix(
    orderedOptionIds,
    activeOptionId
  )

  return (
    <View style={styles.option}>
      <OptionTitle>{title}</OptionTitle>
      <View style={styles.optionValues}>
        <OptionValue
          id={visibleOptionList[0]}
          isActive={false}
          setFunction={setFunction}
        />
        <OptionValue
          id={visibleOptionList[1]}
          isActive={false}
          setFunction={setFunction}
        />
        <Animated.View
          style={[
            {
              transform: [{ scale: optionUpdateTransition }],
            },
          ]}
        >
          <OptionValue
            id={visibleOptionList[2]}
            isActive={true}
            setFunction={setFunction}
          />
        </Animated.View>
        <OptionValue
          id={visibleOptionList[3]}
          isActive={false}
          setFunction={setFunction}
        />
        <OptionValue
          id={visibleOptionList[4]}
          isActive={false}
          setFunction={setFunction}
        />
        <OptionValue
          id={visibleOptionList[5]}
          isActive={false}
          setFunction={setFunction}
        />
      </View>
    </View>
  )
}
