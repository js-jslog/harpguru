import type { Node, Value } from 'react-native-reanimated'
import type { HarpStrata, HarpStrataProps } from 'harpstrata'
import type { ApparatusIds, DegreeIds } from 'harpparts'

export type GlobalState = {
  readonly activeHarpStrata: HarpStrata
  readonly activeExperienceMode: ExperienceModes
  readonly activeDisplayMode: DisplayModes
  readonly bufferedActivityToggles: ReadonlyArray<DegreeIds>
  readonly fragmentHarpFaceByOctaves: boolean
  readonly flushChannel: FlushChannels
}

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

export type OptionStackProps = {
  readonly optionPropsz: ReadonlyArray<OptionProps_All>
}

export type OptionProps_All =
  | OptionProps_Covariants
  | OptionProps_Scales
  | OptionProps_Apparatus

export type OptionProps_Covariants = OptionProps<
  Pick<HarpStrataProps, 'harpKeyId' | 'pozitionId'>
>
export function isOptionProps_Covariants(
  props: OptionProps_All
): props is OptionProps_Covariants {
  const { items } = props
  if (items.length === 0) return false
  const [firstItem] = items
  const { callbackParam } = firstItem
  const tempCallbackParam = callbackParam as Pick<
    HarpStrataProps,
    'harpKeyId' | 'pozitionId'
  >
  if (tempCallbackParam.harpKeyId === undefined) return false
  return true
}
export type OptionProps_Scales = OptionProps<ReadonlyArray<DegreeIds>>
export function isOptionProps_Scales(
  props: OptionProps_All
): props is OptionProps_Scales {
  const { items } = props
  return Array.isArray(items)
}
export type OptionProps_Apparatus = OptionProps<ApparatusIds>

type OptionProps<T> = TitleProps & ListProps<T>

export type TitleProps = {
  readonly title: string
  readonly useSubTitle?: () => string
}

export type ListProps<T> = {
  readonly items: ReadonlyArray<Item<T>>
  readonly twoColumns: boolean
  readonly itemTapHandler: (arg0: T) => void
  readonly useLeftColumnLabel?: () => string
  readonly useRightColumnLabel?: () => string
}

export type WithTransition = {
  readonly transitionValue: Node<number>
}

export type WithStateValue = {
  readonly stateValue: Value<number>
}

type Item<T> = {
  readonly label: string
  readonly callbackParam: T
}
