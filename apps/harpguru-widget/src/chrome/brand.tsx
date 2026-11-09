import { Text } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { chromeStyles } from './styles'

export const Brand = (): ReactElement => (
  <a href="/" style={{ textDecoration: 'none' }}>
    <Text style={chromeStyles.title}>Harp Guru</Text>
  </a>
)
