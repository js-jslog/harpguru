import type { ViewStyle } from 'react-native'

import type { HarpRowProps } from '../../HarpRow'

export type HarpFaceFragmentProps = Pick<
  HarpRowProps,
  | 'activeHarpStrata'
  | 'setActiveHarpStrata'
  | 'activeDisplayMode'
  | 'activeDisplayMode'
  | 'xRange'
>

export type FragmentFacts = {
  readonly columnCount: number
}

export type HarpFaceFragmentStyles = {
  readonly fragment: ViewStyle
}
