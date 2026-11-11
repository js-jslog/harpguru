import { Text } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { chromeStyles, linkStyle } from './styles'

export const Brand = (): ReactElement => (
  <a href="/" style={linkStyle}>
    <Text style={chromeStyles.title}>Harp Guru</Text>
  </a>
)
