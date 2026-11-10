import { View, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import type { ReactElement } from 'react'
import { readSetupQuery, writeSetupQuery, writeSetupUrl } from 'harpstrata'
import { StandaloneHarpFace } from 'harpguru-core/standalone'

import { colors, chromeStyles, linkStyle } from '../chrome/styles'
import { isUprightWindow } from '../chrome/orientation'
import { correctAddress } from '../address'

// /e/: a partner's demonstration, inside their iframe. The setup is fixed by
// the partner's URL. No call to action, which a partner would not host on
// their own page: only an attribution, which opens the same setup on
// harpguru.com.
export const EmbedPage = (): ReactElement => {
  const { width, height } = useWindowDimensions()
  const setup = useMemo(() => readSetupQuery(window.location.search), [])

  useEffect(() => {
    correctAddress(writeSetupQuery(setup))
  }, [])

  return (
    <View style={chromeStyles.page}>
      <View style={chromeStyles.harpFace}>
        <StandaloneHarpFace
          setup={setup}
          isInteractive
          isUpright={isUprightWindow(width, height)}
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
  ...linkStyle,
  color: colors.quiet,
  fontSize: 12,
} as const
