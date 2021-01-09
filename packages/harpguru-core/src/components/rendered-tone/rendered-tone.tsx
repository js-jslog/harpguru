import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useDimensions } from '@react-native-community/hooks'

import { ExperienceModes } from '../../types'
import type { RenderableToneTuples } from '../../types'
import { getSizes, colors } from '../../styles'

type RenderedToneProps = {
  readonly toneTuples: RenderableToneTuples
  readonly isActive: boolean
  readonly isQuestion: boolean
  readonly splitType: 'FLAT' | 'SLANT'
  readonly activeExperienceMode: ExperienceModes
}

export const RenderedTone = ({
  toneTuples,
  isActive,
  isQuestion,
  splitType,
  activeExperienceMode,
}: RenderedToneProps): React.ReactElement => {
  const isQuizMode = activeExperienceMode === ExperienceModes.Quiz

  const sizes = getSizes(useDimensions().window)
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
      bottom: splitType === 'SLANT' ? sizes['5'] : 0,
      right: splitType === 'SLANT' ? sizes['7'] : sizes['7'],
    },
    flatContentsWrapper: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      top: splitType === 'SLANT' ? sizes['5'] : 0,
      left: splitType === 'SLANT' ? sizes['6'] : sizes['7'],
    },
    note: {
      display: isQuizMode && !isQuestion && !isActive ? 'none' : 'flex',
      color: isActive ? pageColor : borderColor,
      fontSize: noteFontSize,
    },
    modifier: {
      bottom: modifierTopMargin,
      left: modifierTopMargin,
      display: isQuizMode && !isQuestion && !isActive ? 'none' : 'flex',
      color: isActive ? pageColor : borderColor,
      fontSize: modifierFontSize,
    },
  })

  const fragment =
    toneTuples.length === 2 ? (
      <>
        <View style={styles.sharpContentsWrapper}>
          <Text style={styles.note}>{toneTuples[0][0]}</Text>
        </View>
        <View style={styles.sharpContentsWrapper}>
          <Text style={styles.modifier}>{toneTuples[0][1]}</Text>
        </View>
        <View style={styles.flatContentsWrapper}>
          <Text style={styles.note}>{toneTuples[1][0]}</Text>
        </View>
        <View style={styles.flatContentsWrapper}>
          <Text style={styles.modifier}>{toneTuples[1][1]}</Text>
        </View>
      </>
    ) : (
      <>
        <View style={styles.naturalContentsWrapper}>
          <Text style={styles.note}>{toneTuples[0][0]}</Text>
        </View>
        <View style={styles.naturalContentsWrapper}>
          <Text style={styles.modifier}>{toneTuples[0][1]}</Text>
        </View>
      </>
    )

  return fragment
}
