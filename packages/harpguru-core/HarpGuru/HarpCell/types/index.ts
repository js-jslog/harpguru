import type { HarpFaceProps, YXCoord } from '../../HarpFace'

export type HarpCellProps = HarpFaceProps & {
  readonly yxCoord: YXCoord;
};
