import type { Node, Value } from 'react-native-reanimated'
import type { HarpStrataProps } from 'harpstrata'
import type { ApparatusIds, DegreeIds } from 'harpparts'

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
  readonly itemTapHandler: (arg0: T) => void
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
