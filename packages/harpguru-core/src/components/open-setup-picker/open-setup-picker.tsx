import { StyleSheet, View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import type { Setup } from 'harpstrata'

import { TextWithoutOSScale } from '../text-without-os-scale'
import { SetupSummaryPanel } from '../setup-summary-panel'
import {
  LinkDialog,
  LinkDialogButton,
  getLinkDialogScale,
  linkDialogColors,
} from '../link-dialog'

// One place a link's setup can go
export type SetupDestination = {
  readonly label: string
  readonly onChoose: () => void
}

type OpenSetupPickerProps = {
  // The setup the link holds, or undefined when there is nothing to open
  readonly setup: Setup | undefined
  // Every harp face it could go to, in order. As many as the app has.
  readonly harpFaces: ReadonlyArray<SetupDestination>
  readonly onOpenInBrowser: () => void
  readonly onDismiss: () => void
}

// Asks where a setup link the app has been handed should go: a harp face, or
// the browser, so a lesson of several setups can live in tabs and the user
// with the app is never worse off than the one without. The setup is shown in
// full beside the choices, to check before anything changes.
export const OpenSetupPicker = ({
  setup,
  harpFaces,
  onOpenInBrowser,
  onDismiss,
}: OpenSetupPickerProps): ReactElement => {
  const scale = getLinkDialogScale()
  const styles = StyleSheet.create({
    contents: { gap: 12 * scale },
    title: {
      fontSize: 23 * scale,
      fontWeight: '700',
      color: linkDialogColors.text,
    },
    row: { flexDirection: 'row', gap: 20 * scale },
    choices: { width: 320 * scale, gap: 10 * scale },
  })

  return (
    <LinkDialog
      isVisible={setup !== undefined}
      onDismiss={onDismiss}
      testID="open-setup-picker"
    >
      {setup !== undefined && (
        <View style={styles.contents}>
          <TextWithoutOSScale style={styles.title}>
            Open this setup in
          </TextWithoutOSScale>
          <View style={styles.row}>
            <SetupSummaryPanel
              setup={setup}
              eyebrow="Someone shared"
              width={360}
            />
            <View style={styles.choices}>
              {harpFaces.map(({ label, onChoose }) => (
                <LinkDialogButton
                  key={label}
                  label={label}
                  onPress={onChoose}
                  isPrimary
                />
              ))}
              <LinkDialogButton
                label="Open in the browser"
                onPress={onOpenInBrowser}
              />
              <LinkDialogButton label="Cancel" onPress={onDismiss} />
            </View>
          </View>
        </View>
      )}
    </LinkDialog>
  )
}
