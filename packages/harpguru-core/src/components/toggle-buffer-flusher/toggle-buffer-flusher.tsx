import React from 'react'

import { useRegularFlushBufferedToggles } from './hooks'

export const ToggleBufferFlusher = (): React.ReactElement => {
  useRegularFlushBufferedToggles()

  return <></>
}
