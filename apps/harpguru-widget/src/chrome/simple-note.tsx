import { Text, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { colors } from './styles'

// Says why the page offers so little, on the promotional pages only: an
// embed is a partner's page, and doesn't sell the app.
export const SimpleNote = ({
  style,
}: {
  readonly style?: object
}): ReactElement => (
  <Text style={[styles.note, style]}>
    Deliberately simple. Every key, position and scale is in the app.
  </Text>
)

const styles = StyleSheet.create({
  note: {
    color: colors.quiet,
    fontSize: 13,
  },
})
