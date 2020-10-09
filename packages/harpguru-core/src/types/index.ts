import { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
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

export type MenuProps = {
  readonly hideMenu: boolean
  readonly hideLabel: boolean
  readonly openCloseTapHandler: (
    arg0: TapGestureHandlerStateChangeEvent
  ) => void
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
