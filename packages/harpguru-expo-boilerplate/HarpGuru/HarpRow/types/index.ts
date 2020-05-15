import type { HarpFaceProps } from '../../HarpFace'

export type Coord = number

export type HarpRowProps = HarpFaceProps & {
  readonly yCoord: Coord;
};
