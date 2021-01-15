import type { Node } from 'react-native-reanimated'
import type { DegreeIds } from 'harpparts'

// TODO: Find a way to improve this. It needs to be able to
// accept lists which each have different callback parameter types,
// but without becoming too clunky. I don't really mind having all of
// the possible types listed here and guarded for but it's not ideal.
// The `string` version doesn't have any application yet, it's just
// to confirm that I've found *an* approach.
export type OptionListStackProps = {
  readonly stackPropsz: ReadonlyArray<
    OptionListPropsDegreeBuffer | OptionListPropsString
  >
}

export type OptionListPropsDegreeBuffer = OptionListProps<
  ReadonlyArray<DegreeIds>
>
export type OptionListPropsString = OptionListProps<string>

type OptionListProps<T> = {
  readonly title: string
  readonly items: ReadonlyArray<Item<T>>
  readonly itemTapHandler: (arg0: T) => void
}
export type ListTitleProps = {
  readonly title: string
  readonly animatedValue: Node<number>
  readonly selfIndex: number
  readonly totalItems: number
}

export type ListProps<T> = {
  readonly items: ReadonlyArray<Item<T>>
  readonly tapHandler: (arg0: T) => void
  readonly animatedValue: Node<number>
  readonly selfIndex: number
  readonly totalItems: number
}

type Item<T> = {
  readonly label: string
  readonly callbackParam: T
}
