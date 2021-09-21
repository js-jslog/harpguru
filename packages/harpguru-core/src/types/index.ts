import type { StateTuple } from 'reactn/types/use-global'
import type { Node, Value } from 'react-native-reanimated'
import type { HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

export type GlobalState = {
  readonly activeHarpStrata: HarpStrata
  readonly activeExperienceMode: ExperienceModes
  readonly activeDisplayMode: DisplayModes
  readonly bufferedActivityToggles: ReadonlyArray<DegreeIds>
  readonly fragmentHarpFaceByOctaves: boolean
  readonly flushChannel: FlushChannels
  readonly activeQuizDegrees: ReadonlyArray<DegreeIds>
  readonly columnBounds: 'FIT' | readonly [number, number]
}

export type UseGlobal = <
  G extends GlobalState,
  Property extends keyof G = keyof G
>(
  property: Property
) => StateTuple<G, Property>

export enum DisplayModes {
  Degree = 'Degree',
  Pitch = 'Pitch',
}

export enum ExperienceModes {
  Explore = 'Explore',
  Quiz = 'Quiz',
}

export enum FlushChannels {
  Regular,
  Quiz,
  ScalesMenu,
}

export enum MenuStates {
  LayoutMenu,
  CovariantMenu,
  ScalesMenu,
  NoMenu,
}

export enum MenuStashPosition {
  First,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  Seventh,
}

export enum CellStates {
  TappedOn,
  TappedOff,
  On,
  Off,
}

// The reason we need to identify the animation
// types as 'Unsafe' and 'Safe' rather than 'Recoiling'
// and 'NonRecoiling' or something is because the most
// important thing that the name needs to communicate
// to the developer is that if they choose the
// 'Unsafe' animation type, there is a chance that
// they will encounter a nasty unmount error.
// This will occur if the callback that is being
// passed to the hook which uses this enum is updating
// the  harpface, particularly if it is creating a
// harp with fewer rows.
export enum TapAnimationTypes {
  Safe,
  Unsafe,
}

export type MenuProps = {
  readonly isMenuStashed: boolean
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

export type PageNumber = 1 | 2 | 3

export type WithTransition = {
  readonly transitionValue: Node<number>
}

export type WithStateValue = {
  readonly stateValue: Value<number>
}

export enum ZoomIds {
  Fit = 'FIT',
  Seven = 7,
  //Ten = 10
  // Twelve = '12 holes',
}
