import type { HarpStrata } from 'harpstrata'

export enum DisplayModes {
  Degree = 'DEGREE',
  Pitch = 'PITCH',
}

export type HarpFaceProps = {
  readonly harpStrata: HarpStrata;
  readonly displayMode: DisplayModes;
}
