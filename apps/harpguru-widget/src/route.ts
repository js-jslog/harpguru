import { getTuningIdBySlug } from 'harpparts'
import type { TuningIds } from 'harpparts'

import { hasTuningPage } from './tuning-pages/presets'

export type Route =
  | { readonly page: 'setup' }
  | { readonly page: 'embed' }
  | { readonly page: 'tuning'; readonly tuningId: TuningIds }

// Which page a path is. CloudFront serves /s/<anything> from the setup shell
// and /e/<anything> from the embed shell, so only the prefix counts; /s/web,
// the open-in-browser marker, is a setup page like any other. A tuning page
// is served only for a tuning that has one, so any other slug never gets
// here from harpguru.com, and falls back to the setup page in development.
export const readRoute = (pathname: string): Route => {
  if (pathname.startsWith('/e/')) return { page: 'embed' }
  const tuning = /^\/t\/([^/]+)\/?$/.exec(pathname)
  const tuningId = tuning ? getTuningIdBySlug(tuning[1]) : undefined
  if (tuningId !== undefined && hasTuningPage(tuningId)) {
    return { page: 'tuning', tuningId }
  }
  return { page: 'setup' }
}
