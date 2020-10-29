import type {
  ApparatusIds,
  HarpStrata,
  PitchIds,
  PozitionIds,
} from 'harpstrata'

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

export enum MenuStashPosition {
  Top,
  Bottom,
}

export enum CellStates {
  TappedOn,
  TappedOff,
  On,
  Off,
}

export type MenuProps = {
  readonly isMenuHidden: boolean
  readonly isLabelHidden: boolean
  readonly stashPosition: MenuStashPosition
  readonly openCloseMenu: () => void
}

export type ChildrenProps = {
  readonly children: React.ReactNode
}

export type SetActiveHarpStrata = (arg0: HarpStrata) => void
export type SetActiveDisplayMode = (arg0: DisplayModes) => void
export type Coord = number
export type XRange = ReadonlyArray<number>

type RenderableToneTuple = [string, string] | ['', '']
export type RenderableToneTuples =
  | [RenderableToneTuple, RenderableToneTuple]
  | [RenderableToneTuple]

export type OptionIds =
  | ApparatusIds
  | DisplayModes
  | ExperienceModes
  | PitchIds
  | PozitionIds
