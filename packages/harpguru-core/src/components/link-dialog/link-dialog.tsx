import { Modal, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import type { ReactElement, ReactNode } from 'react'

import { TextWithoutOSScale } from '../text-without-os-scale'
import { getColors } from '../../utils'
import { getWindowDimensions } from '../../packages/get-window-dimensions'

// The link dialogs are drawn for a landscape phone of 844 by 390, with large
// type and large buttons for the app's many older users. Every size is
// multiplied by this, so a smaller screen shrinks the whole dialog to fit and
// a tablet grows it, within limits.
export const getLinkDialogScale = (): number => {
  const { longEdge, shortEdge } = getWindowDimensions()
  const scale = Math.min(shortEdge / 390, longEdge / 844)
  return Math.min(Math.max(scale, 0.75), 1.5)
}

// The colours the dialogs add to the app's own
export const linkDialogColors = {
  text: '#222222',
  quietText: '#555555',
  outline: '#555555',
  panel: '#f4f1f4',
} as const

type LinkDialogProps = {
  readonly isVisible: boolean
  readonly onDismiss: () => void
  readonly children: ReactNode
  readonly testID?: string
}

// A card over the page, for sharing a setup link and for opening one. React
// Native's own Modal and Pressable rather than the gesture handler's, which
// needs a root of its own inside a modal on Android.
export const LinkDialog = ({
  isVisible,
  onDismiss,
  children,
  testID,
}: LinkDialogProps): ReactElement => {
  const scale = getLinkDialogScale()
  const { pageColor } = getColors()
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: pageColor,
      borderColor: linkDialogColors.outline,
      borderWidth: 1,
      borderRadius: 12 * scale,
      padding: 16 * scale,
      maxWidth: '95%',
      maxHeight: '95%',
    },
  })

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      supportedOrientations={['landscape', 'portrait']}
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay} testID={testID}>
        <View style={styles.card}>{children}</View>
      </View>
    </Modal>
  )
}

type LinkDialogButtonProps = {
  readonly label: string
  readonly onPress: () => void
  readonly isPrimary?: boolean
}

// Pink with a dark border and dark text for the choices, white for the way
// out. White on the app's pink is 1.4:1 and reads as disabled; dark on it is
// 11:1.
export const LinkDialogButton = ({
  label,
  onPress,
  isPrimary = false,
}: LinkDialogButtonProps): ReactElement => {
  const scale = getLinkDialogScale()
  const { harpguruPink, pageColor } = getColors()
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      minHeight: 56 * scale,
      paddingVertical: 6 * scale,
      paddingHorizontal: 14 * scale,
      borderRadius: 8 * scale,
      borderWidth: 2,
      borderColor: linkDialogColors.outline,
      backgroundColor: isPrimary ? harpguruPink : pageColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontSize: 21 * scale,
      color: linkDialogColors.text,
      fontWeight: isPrimary ? '700' : '500',
      textAlign: 'center',
    },
  })

  return (
    <Pressable style={styles.button} onPress={onPress} accessibilityRole="button">
      <TextWithoutOSScale style={styles.label}>{label}</TextWithoutOSScale>
    </Pressable>
  )
}
