import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { colors } from './styles'
import { PrivacyLink } from './privacy-link'

// Says why the page offers so little, on the promotional pages only: an
// embed is a partner's page, and doesn't sell the app. The privacy notice's
// link sits beside it, so every promotional page carries one.
export const SimpleNote = ({
  style,
}: {
  readonly style?: object
}): ReactElement => (
  <View style={[styles.row, style]}>
    <Text style={styles.note}>
      Deliberately simple. Every key, position and scale is in the app.
    </Text>
    <PrivacyLink />
  </View>
)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    columnGap: 10,
  },
  note: {
    color: colors.quiet,
    fontSize: 13,
  },
})
