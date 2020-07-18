import type { ViewStyle } from 'react-native'

import type { HarpCellProps, Coord } from '../../HarpCell'

export type HarpRowProps = Pick<HarpCellProps, 'activeDisplayMode'> & {
  readonly yCoord: Coord
  readonly xRange: ReadonlyArray<number>
}

export type HarpRowStyles = {
  readonly row: ViewStyle
}
