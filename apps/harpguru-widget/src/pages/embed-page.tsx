import { View, StyleSheet } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import type { ReactElement } from 'react'
import {
  StandaloneHarpFace,
  readSetupQuery,
  writeSetupQuery,
  writeSetupUrl,
} from 'harpguru-core/standalone'

import { colors, chromeStyles } from '../chrome/styles'
import { correctAddress } from '../address'

// /e/: a partner's demonstration, inside their iframe. The setup is fixed by
// the partner's URL. No call to action, which a partner would not host on
// their own page: only an attribution, which opens the same setup on
// harpguru.com.
export const EmbedPage = (): ReactElement => {
  const setup = useMemo(() => readSetupQuery(window.location.search), [])

  useEffect(() => {
    correctAddress(writeSetupQuery(setup))
  }, [])

  return (
    <View style={chromeStyles.page}>
      <View style={chromeStyles.harpFace}>
        <StandaloneHarpFace
          harpStrataProps={setup.harpStrataProps}
          displayMode={setup.displayMode}
          isInteractive={true}
        />
      </View>
      <View style={styles.attribution}>
        <a
          href={writeSetupUrl(setup)}
          target="_blank"
          rel="noopener noreferrer"
          style={attributionLink}
        >
          Harp Guru
        </a>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  attribution: {
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
})

const attributionLink = {
  color: colors.quiet,
  fontFamily: 'system-ui, sans-serif',
  fontSize: 12,
  textDecoration: 'none',
} as const
