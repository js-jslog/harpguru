import { Share, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import { writeSetupUrl } from 'harpstrata'

import { TextWithoutOSScale } from '../text-without-os-scale'
import { QrCode } from '../qr-code'
import { LinkDialog, LinkDialogButton, getLinkDialogSizes } from '../link-dialog'
import { getColors, getSetupFromState } from '../../utils'
import { useHarpGuruStore } from '../../store'

type ShareSheetProps = {
  readonly isVisible: boolean
  readonly onDismiss: () => void
}

// The setup on this harp face as a link, and its QR code, drawn on the
// device. No network, no account.
export const ShareSheet = ({
  isVisible,
  onDismiss,
}: ShareSheetProps): ReactElement => {
  const activeHarpStrata = useHarpGuruStore((state) => state.activeHarpStrata)
  const activeDisplayMode = useHarpGuruStore((state) => state.activeDisplayMode)
  const { fontSize, gap, shortEdge } = getLinkDialogSizes()
  const { inertOutline } = getColors()
  const styles = StyleSheet.create({
    url: {
      fontSize: fontSize * 0.6,
      color: inertOutline,
      marginTop: gap / 2,
      maxWidth: shortEdge * 0.9,
      textAlign: 'center',
    },
  })

  const url = isVisible
    ? writeSetupUrl(getSetupFromState({ activeHarpStrata, activeDisplayMode }))
    : ''
  const shareLink = () => {
    Share.share({ message: url, url }).catch(() => undefined)
  }

  return (
    <LinkDialog isVisible={isVisible} onDismiss={onDismiss} testID="share-sheet">
      {isVisible && (
        <>
          <QrCode value={url} size={shortEdge * 0.5} />
          <TextWithoutOSScale style={styles.url} selectable testID="share-url">
            {url}
          </TextWithoutOSScale>
          <LinkDialogButton label="Share link" onPress={shareLink} isPrimary />
          <LinkDialogButton label="Close" onPress={onDismiss} />
        </>
      )}
    </LinkDialog>
  )
}
