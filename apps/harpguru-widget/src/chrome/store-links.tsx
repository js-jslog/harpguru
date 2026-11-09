import { View, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { colors } from './styles'

export const appStoreUrl = 'https://apps.apple.com/app/id1552752923'
export const playStoreUrl =
  'https://play.google.com/store/apps/details?id=com.jslog.harpguru'

const linkStyle = {
  color: colors.accent,
  fontFamily: 'system-ui, sans-serif',
  fontSize: 14,
  fontWeight: 600,
  textDecoration: 'none',
  padding: '6px 10px',
  border: `1px solid ${colors.accent}`,
  borderRadius: 6,
} as const

// The promotional chrome's call to action: the whole app, in either store.
export const StoreLinks = (): ReactElement => (
  <View style={styles.row}>
    <a href={appStoreUrl} style={linkStyle}>
      App Store
    </a>
    <a href={playStoreUrl} style={linkStyle}>
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
