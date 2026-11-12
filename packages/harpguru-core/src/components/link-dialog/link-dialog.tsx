import { Modal, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import type { ReactElement, ReactNode } from 'react'

import { TextWithoutOSScale } from '../text-without-os-scale'
import { getColors } from '../../utils'
import { getWindowDimensions } from '../../packages/get-window-dimensions'

// The sizes a link dialog is drawn at, from the window's short edge, so it
// reads the same on a phone and a tablet
export const getLinkDialogSizes = (): {
  readonly fontSize: number
  readonly gap: number
  readonly shortEdge: number
} => {
  const { shortEdge } = getWindowDimensions()
  return { fontSize: shortEdge / 24, gap: shortEdge / 40, shortEdge }
}

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
  const { gap } = getLinkDialogSizes()
  const { pageColor, inertOutline } = getColors()
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: pageColor,
      borderColor: inertOutline,
      borderWidth: 1,
      borderRadius: gap,
      padding: gap * 1.5,
      maxWidth: '90%',
      maxHeight: '95%',
      alignItems: 'center',
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

export const LinkDialogButton = ({
  label,
  onPress,
  isPrimary = false,
}: LinkDialogButtonProps): ReactElement => {
  const { fontSize, gap } = getLinkDialogSizes()
  const { harpguruPink, pageColor, inertOutline } = getColors()
  const styles = StyleSheet.create({
    button: {
      marginTop: gap / 2,
      paddingVertical: gap / 2,
      paddingHorizontal: gap,
      borderRadius: gap / 2,
      borderWidth: 1,
      borderColor: isPrimary ? harpguruPink : inertOutline,
      backgroundColor: isPrimary ? harpguruPink : pageColor,
      alignSelf: 'stretch',
      alignItems: 'center',
    },
    label: {
      fontSize,
      color: isPrimary ? pageColor : inertOutline,
      fontWeight: isPrimary ? 'bold' : 'normal',
    },
  })

  return (
    <Pressable style={styles.button} onPress={onPress} accessibilityRole="button">
      <TextWithoutOSScale style={styles.label}>{label}</TextWithoutOSScale>
    </Pressable>
  )
}
