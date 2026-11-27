import { Linking } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { OpenSetupPicker } from '../open-setup-picker'
import type { SetupDestination } from '../open-setup-picker'
import { getStateFromSetup } from '../../utils'
import type { HarpGuruStoreInstance } from '../../store'
import { useIncomingSetupLink } from '../../hooks'

type OpenIncomingSetupLinkProps = {
  // Each harp face's store, in the order they are numbered. As many as the
  // app has; each is offered.
  readonly harpFaceStores: ReadonlyArray<HarpGuruStoreInstance>
  // Brings a harp face into view, by its place in the list
  readonly showHarpFace: (index: number) => void
}

// Takes up each setup link the app is handed, and asks where it goes: into
// a harp face, which then shows the setup, or to the browser at /s/web
export const OpenIncomingSetupLink = ({
  harpFaceStores,
  showHarpFace,
}: OpenIncomingSetupLinkProps): ReactElement => {
  const [incomingLink, clearIncomingLink] = useIncomingSetupLink()

  const harpFaces: ReadonlyArray<SetupDestination> = harpFaceStores.map(
    (store, index) => ({
      label: `Harp face ${index + 1}`,
      onChoose: () => {
        if (incomingLink === undefined) return
        store.setState(getStateFromSetup(incomingLink.setup))
        showHarpFace(index)
        clearIncomingLink()
      },
    })
  )
  const openInBrowser = () => {
    if (incomingLink === undefined) return
    Linking.openURL(incomingLink.browserUrl).catch(() => undefined)
    clearIncomingLink()
  }

  return (
    <OpenSetupPicker
      setup={incomingLink?.setup}
      harpFaces={harpFaces}
      onOpenInBrowser={openInBrowser}
      onDismiss={clearIncomingLink}
    />
  )
}
