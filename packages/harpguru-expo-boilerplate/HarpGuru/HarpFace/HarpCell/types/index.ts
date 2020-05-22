import type { Coord } from '../../HarpRow'
import type { HarpFaceProps } from '../../HarpFace'

export type YXCoord = [Coord, Coord]

export type HarpCellProps = HarpFaceProps & {
  readonly yxCoord: YXCoord;
};
