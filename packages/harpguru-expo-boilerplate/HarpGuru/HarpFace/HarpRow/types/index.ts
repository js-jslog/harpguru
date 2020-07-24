import type { ViewStyle } from 'react-native'

import type { Coord } from '../../HarpCell'

export type HarpRowProps = {
  readonly yCoord: Coord
  readonly xRange: ReadonlyArray<number>
}

export type HarpRowStyles = {
  readonly row: ViewStyle
}
