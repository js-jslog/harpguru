import React from 'react'

import { useFlushBufferedActivityToggles } from './hooks'

export const ToggleBufferFlusher = (): React.ReactElement => {
  useFlushBufferedActivityToggles()

  return <></>
}
