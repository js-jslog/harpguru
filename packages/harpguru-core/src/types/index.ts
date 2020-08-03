import type { HarpStrata } from 'harpstrata'

export enum DisplayModes {
  Degree = 'DEGREE',
  Pitch = 'PITCH',
}

export enum ExperienceModes {
  Explore = 'EXPLORE',
  Quiz = 'QUIZ',
}

export enum MenuStates {
  LayoutMenu,
  CovariantMenu,
  NoMenu,
}

export type SetActiveHarpStrata = (arg0: HarpStrata) => void
export type SetActiveDisplayMode = (arg0: DisplayModes) => void
export type Coord = number
export type XRange = ReadonlyArray<number>
