import React from 'react'
import type { ReactElement } from 'react'

import { readRoute } from './route'
import { TuningPage } from './pages/tuning-page'
import { SetupPage } from './pages/setup-page'
import { EmbedPage } from './pages/embed-page'

export const App = (): ReactElement => {
  const route = readRoute(window.location.pathname)
  if (route.page === 'tuning') return <TuningPage tuningId={route.tuningId} />
  if (route.page === 'embed') return <EmbedPage />
  return <SetupPage />
}
