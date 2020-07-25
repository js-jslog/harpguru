import type { TextStyle, ViewStyle } from 'react-native'

export type Coord = number

export type YXCoord = [Coord, Coord]

export type HarpCellStyles = {
  readonly cell: ViewStyle
  readonly note: TextStyle
  readonly modifier: TextStyle
}
