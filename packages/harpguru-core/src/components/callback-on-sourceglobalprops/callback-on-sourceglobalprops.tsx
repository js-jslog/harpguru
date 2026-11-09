import React from 'react'

import {
  useSetFromSourceHarpStrata,
  useSetFromSourceColumnBounds,
  useSetFromWindowDimensions,
} from './hooks'

export const CallbackOnSourceGlobalProps = (): React.ReactElement => {
  useSetFromSourceHarpStrata()
  useSetFromSourceColumnBounds()
  useSetFromWindowDimensions()

  return <></>
}
