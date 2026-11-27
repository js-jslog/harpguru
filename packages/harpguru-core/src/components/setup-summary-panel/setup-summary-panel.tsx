import { StyleSheet, View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import type { Setup } from 'harpstrata'

import { TextWithoutOSScale } from '../text-without-os-scale'
import { getLinkDialogScale, linkDialogColors } from '../link-dialog'
import { getColors, getSetupSummary } from '../../utils'

type SetupSummaryPanelProps = {
  readonly setup: Setup
  // A line above the setup's name, saying why it is shown
  readonly eyebrow: string
  // The panel's width at the dialogs' design size, before scaling
  readonly width: number
}

// A setup in full, for checking before it changes anything: its name, the
// four facts the app's menus use, and the twelve degrees drawn as the legend
// draws them, the lit ones filled in their own colours
export const SetupSummaryPanel = ({
  setup,
  eyebrow,
  width,
}: SetupSummaryPanelProps): ReactElement => {
  const scale = getLinkDialogScale()
  const { degreeColors } = getColors()
  const { title, harpKey, position, songKey, tuning, degrees } =
    getSetupSummary(setup)
  const innerWidth = (width - 28) * scale
  const gap = 4 * scale
  const cell = (innerWidth - gap * 11) / 12

  const styles = StyleSheet.create({
    panel: {
      width: width * scale,
      backgroundColor: linkDialogColors.panel,
      borderRadius: 10 * scale,
      paddingVertical: 12 * scale,
      paddingHorizontal: 14 * scale,
      gap: 10 * scale,
    },
    eyebrow: {
      fontSize: 12 * scale,
      fontWeight: '600',
      letterSpacing: 0.72 * scale,
      textTransform: 'uppercase',
      color: linkDialogColors.quietText,
    },
    title: {
      fontSize: 24 * scale,
      fontWeight: '700',
      color: linkDialogColors.text,
    },
    factRow: { flexDirection: 'row', gap: 16 * scale },
    fact: { flex: 1, gap: 2 * scale },
    factValue: {
      fontSize: 21 * scale,
      fontWeight: '600',
      color: linkDialogColors.text,
    },
    strip: { flexDirection: 'row', gap },
    cell: {
      width: cell,
      height: cell,
      borderRadius: 4 * scale,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cellLabel: { fontSize: cell * 0.46, fontWeight: '700' },
  })

  const fact = (label: string, value: string) => (
    <View style={styles.fact}>
      <TextWithoutOSScale style={styles.eyebrow}>{label}</TextWithoutOSScale>
      <TextWithoutOSScale style={styles.factValue}>{value}</TextWithoutOSScale>
    </View>
  )
  const litLabels = degrees
    .filter(({ isActive }) => isActive)
    .map(({ label }) => label)
    .join(', ')

  return (
    <View style={styles.panel} testID="setup-summary">
      <View style={{ gap: 2 * scale }}>
        <TextWithoutOSScale style={styles.eyebrow}>{eyebrow}</TextWithoutOSScale>
        <TextWithoutOSScale style={styles.title}>{title}</TextWithoutOSScale>
      </View>
      <View style={styles.factRow}>
        {fact('Harp key', harpKey)}
        {fact('Position', position)}
      </View>
      <View style={styles.factRow}>
        {fact('Song key', songKey)}
        {fact('Tuning', tuning)}
      </View>
      <View style={{ gap: 4 * scale }}>
        <TextWithoutOSScale style={styles.eyebrow}>Notes lit</TextWithoutOSScale>
        <View
          style={styles.strip}
          accessible
          accessibilityLabel={`Notes lit: ${litLabels === '' ? 'none' : litLabels}`}
        >
          {degrees.map(({ id, label, isActive }) => (
            <View
              key={id}
              testID={isActive ? 'degree-lit' : 'degree-unlit'}
              style={[
                styles.cell,
                isActive
                  ? {
                    backgroundColor: degreeColors[id],
                    borderWidth: 2,
                    borderColor: linkDialogColors.text,
                  }
                  : {
                    backgroundColor: '#ffffff',
                    borderWidth: 1,
                    borderColor: '#bbbbbb',
                  },
              ]}
            >
              <TextWithoutOSScale
                style={[
                  styles.cellLabel,
                  { color: isActive ? '#ffffff' : '#777777' },
                ]}
              >
                {label}
              </TextWithoutOSScale>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
