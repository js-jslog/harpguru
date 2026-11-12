import { StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import type { Setup } from 'harpstrata'
import { getPozition } from 'harpparts'

import { TextWithoutOSScale } from '../text-without-os-scale'
import { LinkDialog, LinkDialogButton, getLinkDialogSizes } from '../link-dialog'
import { getColors } from '../../utils'

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

// 'C harp · 2nd position · Major diatonic'
export const describeSetup = ({
  harpStrataProps: { harpKeyId, pozitionId, tuningId },
}: Setup): string => {
  const {
    simpleSplitValue: [number, suffix],
  } = getPozition(pozitionId)
  return `${harpKeyId} harp · ${number}${suffix} position · ${tuningId}`
}

// Asks where a setup link the app has been handed should go: a harp face, or
// the browser, so a lesson of several setups can live in tabs and the user
// with the app is never worse off than the one without.
export const OpenSetupPicker = ({
  setup,
  harpFaces,
  onOpenInBrowser,
  onDismiss,
}: OpenSetupPickerProps): ReactElement => {
  const { fontSize, gap } = getLinkDialogSizes()
  const { inertOutline } = getColors()
  const styles = StyleSheet.create({
    title: { fontSize, fontWeight: 'bold', color: inertOutline },
    setup: { fontSize: fontSize * 0.8, color: inertOutline, marginVertical: gap / 2 },
  })

  return (
    <LinkDialog
      isVisible={setup !== undefined}
      onDismiss={onDismiss}
      testID="open-setup-picker"
    >
      <TextWithoutOSScale style={styles.title}>
        Open this setup in
      </TextWithoutOSScale>
      {setup !== undefined && (
        <TextWithoutOSScale style={styles.setup}>
          {describeSetup(setup)}
        </TextWithoutOSScale>
      )}
      {harpFaces.map(({ label, onChoose }) => (
        <LinkDialogButton key={label} label={label} onPress={onChoose} isPrimary />
      ))}
      <LinkDialogButton label="Open in the browser" onPress={onOpenInBrowser} />
      <LinkDialogButton label="Cancel" onPress={onDismiss} />
    </LinkDialog>
  )
}
