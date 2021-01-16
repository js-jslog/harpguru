import type { Node } from 'react-native-reanimated'
import type { DegreeIds } from 'harpparts'

// TODO: Find a way to improve this. It needs to be able to
// accept lists which each have different callback parameter types,
// but without becoming too clunky. I don't really mind having all of
// the possible types listed here and guarded for but it's not ideal.
// The `string` version doesn't have any application yet, it's just
// to confirm that I've found *an* approach.
export type OptionStackProps = {
  readonly stackPropsz: ReadonlyArray<OptionProps_Scales | OptionProps_Dummy>
}

export type OptionProps_Scales = OptionProps<ReadonlyArray<DegreeIds>>
export type OptionProps_Dummy = OptionProps<string>

type OptionProps<T> = TitleProps & ListProps<T>

export type TitleProps = {
  readonly title: string
}

export type ListProps<T> = {
  readonly items: ReadonlyArray<Item<T>>
  readonly itemTapHandler: (arg0: T) => void
}

export type AnimationProps = {
  readonly animationValue: Node<number>
}

type Item<T> = {
  readonly label: string
  readonly callbackParam: T
}
