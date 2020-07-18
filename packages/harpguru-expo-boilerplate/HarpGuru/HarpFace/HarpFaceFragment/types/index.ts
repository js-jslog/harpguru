import type { ViewStyle } from 'react-native'

import type { HarpRowProps } from '../../HarpRow'

export type HarpFaceFragmentProps = Pick<
  HarpRowProps,
  'activeDisplayMode' | 'activeDisplayMode' | 'xRange'
>

export type FragmentFacts = {
  readonly columnCount: number
}

export type HarpFaceFragmentStyles = {
  readonly fragment: ViewStyle
}
