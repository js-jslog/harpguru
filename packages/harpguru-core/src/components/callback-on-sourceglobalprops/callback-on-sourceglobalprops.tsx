import React from 'react'

import {
  useSetFromSourceHarpStrata,
  useSetFromSourceColumnBounds,
} from './hooks'

export const CallbackOnSourceGlobalProps = (): React.ReactElement => {
  useSetFromSourceHarpStrata()
  useSetFromSourceColumnBounds()

  return <></>
}
