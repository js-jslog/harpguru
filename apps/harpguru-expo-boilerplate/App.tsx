import { StatusBar } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import { HarpGuru } from 'harpguru-core'

const App = (): ReactElement => {
  return (
    <>
      <StatusBar hidden={true} />
      <HarpGuru />
    </>
  )
}

export default App
