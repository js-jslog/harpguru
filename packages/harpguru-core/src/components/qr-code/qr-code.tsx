import { View } from 'react-native'
import React, { useMemo } from 'react'
import type { ReactElement } from 'react'

import { getQrRuns } from '../../utils'

type QrCodeProps = {
  readonly value: string
  // The whole code's width and height, quiet zone included
  readonly size: number
}

// The quiet zone a scanner needs around a code, in modules
const quietZone = 4

// Dark on white whatever the app's colours, since that is what scanners read
// best. Each dark run of a row is one view.
export const QrCode = ({ value, size }: QrCodeProps): ReactElement => {
  const { size: modules, runs } = useMemo(() => getQrRuns(value), [value])
  const moduleSize = size / (modules + quietZone * 2)

  return (
    <View
      style={{ width: size, height: size, backgroundColor: '#ffffff' }}
      accessibilityRole="image"
      accessibilityLabel="QR code of the setup link"
      testID="qr-code"
    >
      {runs.map(({ row, start, length }) => (
        <View
          key={`${row}-${start}`}
          style={{
            position: 'absolute',
            backgroundColor: '#000000',
            top: (row + quietZone) * moduleSize,
            left: (start + quietZone) * moduleSize,
            // A hair over, so neighbouring rows don't show a seam between them
            width: length * moduleSize + 0.5,
            height: moduleSize + 0.5,
          }}
        />
      ))}
    </View>
  )
}
