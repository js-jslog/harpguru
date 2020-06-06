import type { HarpStrata } from 'harpstrata'

export enum DisplayModes {
  Degree = 'DEGREE',
  Pitch = 'PITCH',
}

export type HarpFaceProps = {
  readonly activeHarpStrata: HarpStrata;
  readonly setActiveHarpStrata: (harpStrata: HarpStrata) => void;
  readonly activeDisplayMode: DisplayModes;
}

export type HarpFaceFacts = {
  readonly columnCount: number;
  readonly rowCount: number;
}
