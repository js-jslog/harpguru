import { View, Text } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import type { ReactElement } from 'react'
import {
  StandaloneHarpFace,
  readSetupQuery,
  writeSetupQuery,
} from 'harpguru-core/standalone'

import { describeHarp, describeScale } from '../describe-setup'
import { chromeStyles } from '../chrome/styles'
import { StoreLinks } from '../chrome/store-links'
import { Brand } from '../chrome/brand'
import { correctAddress } from '../address'

// /s/: a teacher's setup, fixed by the link. Cells toggle and a scale flashes
// its name; nothing on the page changes the setup.
export const SetupPage = (): ReactElement => {
  const setup = useMemo(() => readSetupQuery(window.location.search), [])
  const harp = describeHarp(setup.harpStrataProps)
  const scale = describeScale(setup.harpStrataProps.activeIds)

  useEffect(() => {
    correctAddress(writeSetupQuery(setup))
    document.title = `${harp} | Harp Guru`
  }, [])

  return (
    <View style={chromeStyles.page}>
      <View style={chromeStyles.bar}>
        <View style={chromeStyles.heading}>
          <Brand />
          <Text style={chromeStyles.detail}>
            {scale ? `${harp} · ${scale}` : harp}
          </Text>
        </View>
        <StoreLinks />
      </View>
      <View style={chromeStyles.harpFace}>
        <StandaloneHarpFace
          harpStrataProps={setup.harpStrataProps}
          displayMode={setup.displayMode}
          isInteractive={true}
        />
      </View>
    </View>
  )
}
