import { Linking } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { readSetupUrl, siteOrigin } from 'harpstrata'
import type { Setup } from 'harpstrata'

// A setup link the app has been handed and accepted, and where the browser
// would open the same link
export type IncomingSetupLink = {
  readonly setup: Setup
  readonly browserUrl: string
}

// Every link the operating system hands the app is read by readSetupUrl,
// which accepts only a harpguru.com /s/ setup link; anything else is refused
// with undefined. The browser gets the link's own query, as it was written,
// at /s/web, which the app's link rules leave out, so the request logs count
// what the link said rather than the app's rewriting of it.
export const readIncomingSetupLink = (
  url: string
): IncomingSetupLink | undefined => {
  const setup = readSetupUrl(url)
  if (setup === undefined) return undefined
  const trimmed = url.trim()
  const queryStart = trimmed.indexOf('?')
  const fragmentStart = trimmed.indexOf('#')
  const query =
    queryStart === -1
      ? ''
      : trimmed.slice(
        queryStart + 1,
        fragmentStart === -1 ? undefined : fragmentStart
      )
  const browserUrl = `${siteOrigin}/s/web${query === '' ? '' : `?${query}`}`
  return { setup, browserUrl }
}

// The setup link the app was opened with, or was handed while running,
// until it is dealt with. A link that is refused changes nothing.
export const useIncomingSetupLink = (): readonly [
  IncomingSetupLink | undefined,
  () => void,
] => {
  const [link, setLink] = useState<IncomingSetupLink | undefined>()

  useEffect(() => {
    let isMounted = true
    const receive = (url: string | null) => {
      if (!isMounted || url === null) return
      const incoming = readIncomingSetupLink(url)
      if (incoming !== undefined) setLink(incoming)
    }
    Linking.getInitialURL()
      .then(receive)
      .catch(() => undefined)
    const subscription = Linking.addEventListener('url', ({ url }) =>
      receive(url)
    )
    return () => {
      isMounted = false
      subscription.remove()
    }
  }, [])

  const clear = useCallback(() => setLink(undefined), [])
  return [link, clear] as const
}
