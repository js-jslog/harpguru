import type { Coord } from '../../../types'

export enum CellState {
  'TAPPED_ON',
  'TAPPED_OFF',
  'ON',
  'OFF',
}

export type YXCoord = [Coord, Coord]
