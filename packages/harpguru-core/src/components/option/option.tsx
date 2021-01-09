import { View, Text } from 'react-native'
import React from 'react'

import { OptionValue } from '../option-value'
import type { OptionIds, ChildrenProps } from '../../types'

import { setOptionsInListOfSix } from './utils'
import { useStyles } from './hooks'

type OptionProps = {
  readonly title: string
  readonly activeOptionId: OptionIds
  readonly orderedOptionIds: ReadonlyArray<OptionIds>
  readonly nudgeFunction: (arg0: 'UP' | 'DOWN') => void
  readonly setFunction: (arg0: OptionIds) => void
}

const OptionTitle = ({ children }: ChildrenProps): React.ReactElement => {
  const styles = useStyles()
  return <Text style={styles.optionTitle}>{children}</Text>
}

export const Option = (props: OptionProps): React.ReactElement => {
  const styles = useStyles()

  const { title, activeOptionId, orderedOptionIds, setFunction } = props

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
        <OptionValue
          id={visibleOptionList[2]}
          isActive={true}
          setFunction={setFunction}
        />
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
