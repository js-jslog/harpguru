import type { HarpStrata } from 'harpstrata'

import type { SetActiveHarpStrata } from '../../HarpGuru'

export enum DisplayModes {
  Degree = 'DEGREE',
  Pitch = 'PITCH',
}

export type HarpFaceProps = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
  readonly activeDisplayMode: DisplayModes
}

export type HarpFaceFacts = {
  readonly columnCount: number
  readonly rowCount: number
}
