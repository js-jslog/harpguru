import { useGlobal } from 'reactn'
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { ExperienceModes } from '../../types'
import { getSizes, colors } from '../../styles'

type NoteTuple = [string, string] | [string, undefined] | [undefined, undefined]

type NoteDisplayFragment = {
  readonly displayValue: ReadonlyArray<NoteTuple>
  readonly isActive: boolean
}
export const NoteDisplayFragment = ({
  displayValue,
  isActive,
}: NoteDisplayFragment): React.ReactElement => {
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const isQuizMode = activeExperienceMode === ExperienceModes.Quiz

  const sizes = getSizes()
  const { 7: noteFontSize, 5: modifierTopMargin, 6: modifierFontSize } = sizes
  const { pageColor, inertOutline: borderColor } = colors

  const styles = StyleSheet.create({
    naturalContentsWrapper: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sharpContentsWrapper: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: sizes['5'],
      right: sizes['7'],
    },
    flatContentsWrapper: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      top: sizes['5'],
      left: sizes['6'],
    },
    note: {
      display: isQuizMode && !isActive ? 'none' : 'flex',
      color: isActive ? pageColor : borderColor,
      fontSize: noteFontSize,
    },
    modifier: {
      bottom: modifierTopMargin,
      left: modifierTopMargin,
      display: isQuizMode && !isActive ? 'none' : 'flex',
      color: isActive ? pageColor : borderColor,
      fontSize: modifierFontSize,
    },
  })

  const fragment =
    displayValue.length === 2 ? (
      <>
        <View style={styles.sharpContentsWrapper}>
          <Text style={styles.note}>{displayValue[0][0]}</Text>
        </View>
        <View style={styles.sharpContentsWrapper}>
          <Text style={styles.modifier}>{displayValue[0][1]}</Text>
        </View>
        <View style={styles.flatContentsWrapper}>
          <Text style={styles.note}>{displayValue[1][0]}</Text>
        </View>
        <View style={styles.flatContentsWrapper}>
          <Text style={styles.modifier}>{displayValue[1][1]}</Text>
        </View>
      </>
    ) : (
      <>
        <View style={styles.naturalContentsWrapper}>
          <Text style={styles.note}>{displayValue[0][0]}</Text>
        </View>
        <View style={styles.naturalContentsWrapper}>
          <Text style={styles.modifier}>{displayValue[0][1]}</Text>
        </View>
      </>
    )

  return fragment
}
