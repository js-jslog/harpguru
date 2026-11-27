import { Share, StyleSheet, View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import { writeSetupUrl } from 'harpstrata'

import { SetupSummaryPanel } from '../setup-summary-panel'
import { QrCode } from '../qr-code'
import {
  LinkDialog,
  LinkDialogButton,
  LinkDialogPrivacyLine,
  getLinkDialogScale,
} from '../link-dialog'
import { getSetupFromState } from '../../utils'
import { useHarpGuruStore } from '../../store'

type ShareSheetProps = {
  readonly isVisible: boolean
  readonly onDismiss: () => void
}

// The setup on this harp face as a link and its QR code, drawn on the device,
// beside the setup in full so it can be checked before it is shown. No
// network, no account. The link itself goes by Share link rather than on
// screen, where the panel says the same in words.
export const ShareSheet = ({
  isVisible,
  onDismiss,
}: ShareSheetProps): ReactElement => {
  const activeHarpStrata = useHarpGuruStore((state) => state.activeHarpStrata)
  const activeDisplayMode = useHarpGuruStore((state) => state.activeDisplayMode)
  const scale = getLinkDialogScale()
  const styles = StyleSheet.create({
    contents: { gap: 8 * scale },
    row: { flexDirection: 'row', alignItems: 'center', gap: 20 * scale },
    side: { gap: 10 * scale },
    buttons: { flexDirection: 'row', gap: 10 * scale },
  })

  const setup = getSetupFromState({ activeHarpStrata, activeDisplayMode })
  const url = isVisible ? writeSetupUrl(setup) : ''
  const shareLink = () => {
    Share.share({ message: url, url }).catch(() => undefined)
  }

  return (
    <LinkDialog isVisible={isVisible} onDismiss={onDismiss} testID="share-sheet">
      {isVisible && (
        <View style={styles.contents}>
          <View style={styles.row}>
            <QrCode value={url} size={290 * scale} />
            <View style={styles.side}>
              <SetupSummaryPanel setup={setup} eyebrow="Scan or share" width={410} />
              <View style={styles.buttons}>
                <LinkDialogButton label="Share link" onPress={shareLink} isPrimary />
                <LinkDialogButton label="Close" onPress={onDismiss} />
              </View>
            </View>
          </View>
          <LinkDialogPrivacyLine />
        </View>
      )}
    </LinkDialog>
  )
}
