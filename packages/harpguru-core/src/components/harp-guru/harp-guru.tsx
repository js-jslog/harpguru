import 'react-native-gesture-handler'

import { createProvider, getGlobal } from 'reactn'
import React from 'react'
import type { ReactElement } from 'react'

import { HarpGuruPage } from '../harp-guru-page'
import { setGlobalState } from '../../utils'

setGlobalState()

export const HarpGuru = (): ReactElement => {
  const Provider1 = createProvider(getGlobal())
  const Provider2 = createProvider(getGlobal())

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
