import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { OptionValue } from '../option-value-new'
import { OptionIds } from '../../types'

import { getStyles } from './option-styles'

type OptionProps = {
  readonly title: string
  readonly activeOptionId: OptionIds
  readonly orderedOptionIds: ReadonlyArray<OptionIds>
  readonly setFunction: (arg0: OptionIds) => void
}

type TitleProps = {
  readonly children: React.ReactNode
}

const OptionTitle = ({ children }: TitleProps): React.ReactElement => {
  const styles = getStyles()
  return <Text style={styles.optionTitle}>{children}</Text>
}

export const Option = (props: OptionProps): React.ReactElement => {
  const styles = getStyles()
  const { title, activeOptionId, orderedOptionIds, setFunction } = props
  const [preactiveId, setPreactiveId] = useState(activeOptionId)

  const setActiveOptionCallback = (optionId: OptionIds): void => {
    setPreactiveId(optionId)
  }
  React.useEffect(() => {
    const flushOptionSelect = setTimeout(() => {
      setFunction(preactiveId)
    }, 100)
    return () => {
      clearTimeout(flushOptionSelect)
    }
  }, [preactiveId])

  const extendedList = [
    undefined,
    undefined,
    ...orderedOptionIds,
    undefined,
    undefined,
  ]

  const activeIndex = orderedOptionIds.indexOf(activeOptionId)
  const innerActiveIdPos = activeIndex + 2

  const { [innerActiveIdPos + 2]: inactiveOptionId1 } = extendedList
  const { [innerActiveIdPos + 1]: inactiveOptionId2 } = extendedList
  const { [innerActiveIdPos - 1]: inactiveOptionId3 } = extendedList
  const { [innerActiveIdPos - 2]: inactiveOptionId4 } = extendedList
  const { [innerActiveIdPos - 3]: inactiveOptionId5 } = extendedList

  const optionValuesActiveStyle = {
    ...styles.optionValues,
    ...styles.optionValuesActive,
  }
  const optionValuesStyle = { ...styles.optionValues }

  return (
    <View style={[styles.option]}>
      <OptionTitle>{title}</OptionTitle>
      <View style={styles.optionValues}>
        <OptionValue
          id={inactiveOptionId1}
          isActive={preactiveId === inactiveOptionId1}
          setFunction={setActiveOptionCallback}
          style={
            preactiveId === inactiveOptionId1
              ? optionValuesActiveStyle
              : optionValuesStyle
          }
        />
        <OptionValue
          id={inactiveOptionId2}
          isActive={preactiveId === inactiveOptionId2}
          setFunction={setActiveOptionCallback}
          style={
            preactiveId === inactiveOptionId2
              ? optionValuesActiveStyle
              : optionValuesStyle
          }
        />
        <OptionValue
          id={activeOptionId}
          isActive={preactiveId === activeOptionId}
          setFunction={setActiveOptionCallback}
          style={
            preactiveId === activeOptionId
              ? optionValuesActiveStyle
              : optionValuesStyle
          }
        />
        <OptionValue
          id={inactiveOptionId3}
          isActive={preactiveId === inactiveOptionId3}
          setFunction={setActiveOptionCallback}
          style={
            preactiveId === inactiveOptionId3
              ? optionValuesActiveStyle
              : optionValuesStyle
          }
        />
        <OptionValue
          id={inactiveOptionId4}
          isActive={preactiveId === inactiveOptionId4}
          setFunction={setActiveOptionCallback}
          style={
            preactiveId === inactiveOptionId4
              ? optionValuesActiveStyle
              : optionValuesStyle
          }
        />
        <OptionValue
          id={inactiveOptionId5}
          isActive={preactiveId === inactiveOptionId5}
          setFunction={setActiveOptionCallback}
          style={
            preactiveId === inactiveOptionId5
              ? optionValuesActiveStyle
              : optionValuesStyle
          }
        />
      </View>
    </View>
  )
}
