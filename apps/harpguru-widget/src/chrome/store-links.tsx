import { View, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { colors, linkStyle } from './styles'
import { appStoreUrl, playStoreUrl } from './store-ids'

const storeLinkStyle = {
  ...linkStyle,
  color: colors.text,
  backgroundColor: colors.action,
  fontSize: 14,
  fontWeight: 600,
  padding: '6px 10px',
  borderRadius: 6,
} as const

// The promotional chrome's call to action: the whole app, in either store.
export const StoreLinks = (): ReactElement => (
  <View style={styles.row}>
    <a href={appStoreUrl} style={storeLinkStyle}>
      App Store
    </a>
    <a href={playStoreUrl} style={storeLinkStyle}>
      Google Play
    </a>
  </View>
)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
})
