import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import { PitchIds, ValvingIds } from 'harpparts'
import type { TuningIds } from 'harpparts'
import { DisplayModes, StandaloneHarpFace } from 'harpguru-core/standalone'

import { readTuningQuery, writeTuningQuery } from '../tuning-pages/tuning-query'
import type { TuningView } from '../tuning-pages/tuning-query'
import { getPresets } from '../tuning-pages/presets'
import type { Preset } from '../tuning-pages/presets'
import { describeHarp } from '../describe-setup'
import { colors, chromeStyles } from '../chrome/styles'
import { StoreLinks } from '../chrome/store-links'
import { Brand } from '../chrome/brand'
import { correctAddress } from '../address'

type TuningPageProps = {
  readonly tuningId: TuningIds
}

// /t/<tuning>: a reference for one tuning. A C harp, a preset for each
// pozition the tuning is built for, and degrees or pitches. Cells don't
// toggle, because configuration and cell interaction never share a page.
export const TuningPage = ({ tuningId }: TuningPageProps): ReactElement => {
  const presets = getPresets(tuningId)
  const [view, setView] = useState<TuningView>(() =>
    readTuningQuery(tuningId, window.location.search)
  )
  const harpStrataProps = {
    tuningId,
    valvingId: ValvingIds.NotValved,
    pozitionId: view.preset.pozitionId,
    harpKeyId: PitchIds.C,
    activeIds: view.preset.degrees,
  }

  useEffect(() => {
    correctAddress(writeTuningQuery(view))
  }, [view])

  return (
    <View style={chromeStyles.page}>
      <View style={chromeStyles.bar}>
        <View style={chromeStyles.heading}>
          <Brand />
          <Text style={chromeStyles.title}>{tuningId}</Text>
          <Text style={chromeStyles.detail}>
            {describeHarp(harpStrataProps, { withTuning: false })}
          </Text>
        </View>
        <StoreLinks />
      </View>
      <View style={styles.controls}>
        {presets.map((preset) => (
          <Choice
            key={preset.pozitionId}
            label={presetLabel(preset)}
            isChosen={preset.pozitionId === view.preset.pozitionId}
            onPress={() => setView({ ...view, preset })}
          />
        ))}
        <View style={styles.divider} />
        <Choice
          label="Degrees"
          isChosen={view.displayMode === DisplayModes.Degree}
          onPress={() => setView({ ...view, displayMode: DisplayModes.Degree })}
        />
        <Choice
          label="Pitches"
          isChosen={view.displayMode === DisplayModes.Pitch}
          onPress={() => setView({ ...view, displayMode: DisplayModes.Pitch })}
        />
      </View>
      <View style={chromeStyles.harpFace}>
        <StandaloneHarpFace
          harpStrataProps={harpStrataProps}
          displayMode={view.displayMode}
          isInteractive={false}
        />
      </View>
    </View>
  )
}

const presetLabel = ({ pozitionId, scaleLabel }: Preset): string =>
  `${pozitionId} position · ${scaleLabel}`

type ChoiceProps = {
  readonly label: string
  readonly isChosen: boolean
  readonly onPress: () => void
}

const Choice = ({ label, isChosen, onPress }: ChoiceProps): ReactElement => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityState={{ selected: isChosen }}
    style={[styles.choice, isChosen && styles.chosen]}
  >
    <Text style={[styles.choiceText, isChosen && styles.chosenText]}>
      {label}
    </Text>
  </Pressable>
)

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.rule,
  },
  choice: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.rule,
  },
  chosen: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  choiceText: {
    color: colors.text,
    fontSize: 14,
  },
  chosenText: {
    color: colors.page,
  },
})
