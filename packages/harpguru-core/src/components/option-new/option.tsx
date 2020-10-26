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

type OptionDisplayList = [
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined
]
const selectFiveOptions = (
  orderedOptionIds: ReadonlyArray<OptionIds>
): OptionDisplayList => {
  if (orderedOptionIds.length <= 6) {
    const arrayToFill = [0, 0, 0, 0, 0, 0]
    const retVal = arrayToFill.map((_element, index) => {
      if (orderedOptionIds[index]) return orderedOptionIds[index]
      return undefined
    }) as OptionDisplayList

    return retVal
  }
  return orderedOptionIds.slice(0, 6) as OptionDisplayList
}

export const Option = (props: OptionProps): React.ReactElement => {
  const styles = getStyles()
  const { title, activeOptionId, orderedOptionIds, setFunction } = props
  const [preactiveId, setPreactiveId] = useState(activeOptionId)

  const setActiveOptionCallback = (optionId: OptionIds): void => {
    setPreactiveId(optionId)
  }
  const cancelActiveOptionCallback = (): void => {
    setPreactiveId(activeOptionId)
  }
  React.useEffect(() => {
    const flushOptionSelect = setTimeout(() => {
      if (activeOptionId === preactiveId) return
      setFunction(preactiveId)
    }, 500)
    return () => {
      clearTimeout(flushOptionSelect)
    }
  }, [preactiveId])

  const visibleOptionList = selectFiveOptions(orderedOptionIds)

  return (
    <View style={[styles.option]}>
      <OptionTitle>{title}</OptionTitle>
      <View>
        <OptionValue
          id={visibleOptionList[0]}
          preactiveId={preactiveId}
          setFunction={setActiveOptionCallback}
          cancelFunction={cancelActiveOptionCallback}
        />
        <OptionValue
          id={visibleOptionList[1]}
          preactiveId={preactiveId}
          setFunction={setActiveOptionCallback}
          cancelFunction={cancelActiveOptionCallback}
        />
        <OptionValue
          id={visibleOptionList[2]}
          preactiveId={preactiveId}
          setFunction={setActiveOptionCallback}
          cancelFunction={cancelActiveOptionCallback}
        />
        <OptionValue
          id={visibleOptionList[3]}
          preactiveId={preactiveId}
          setFunction={setActiveOptionCallback}
          cancelFunction={cancelActiveOptionCallback}
        />
        <OptionValue
          id={visibleOptionList[4]}
          preactiveId={preactiveId}
          setFunction={setActiveOptionCallback}
          cancelFunction={cancelActiveOptionCallback}
        />
        <OptionValue
          id={visibleOptionList[5]}
          preactiveId={preactiveId}
          setFunction={setActiveOptionCallback}
          cancelFunction={cancelActiveOptionCallback}
        />
      </View>
    </View>
  )
}
