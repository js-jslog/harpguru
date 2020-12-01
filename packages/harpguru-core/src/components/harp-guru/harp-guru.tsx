import 'react-native-gesture-handler'

import { createProvider } from 'reactn'
import React from 'react'
import type { ReactElement } from 'react'

import { HarpGuruPage } from '../harp-guru-page'

import { getInitialGlobalState } from './utils'

export const HarpGuru = (): ReactElement => {
  const initialGlobalState = getInitialGlobalState()
  const Provider1 = createProvider(initialGlobalState)
  const Provider2 = createProvider(initialGlobalState)

  return (
    <>
      <Provider1>
        <HarpGuruPage shifted={false} />
      </Provider1>
      <Provider2>
        <HarpGuruPage shifted={true} />
      </Provider2>
    </>
  )
}
