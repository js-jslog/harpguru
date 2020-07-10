import type { TextStyle, ViewStyle } from 'react-native'

import type { HarpFaceProps } from '../../types'
import type { Coord } from '../../HarpRow'

export type YXCoord = [Coord, Coord]

export type HarpCellProps = HarpFaceProps & {
  readonly yxCoord: YXCoord
}

export type HarpCellStyles = {
  readonly cell: ViewStyle
  readonly text: TextStyle
}
