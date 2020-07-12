import type { TextStyle, ViewStyle } from 'react-native'
import type { HarpStrata } from 'harpstrata'

import type { DisplayModes } from '../../types'
import type { Coord } from '../../HarpRow'
import type { SetActiveHarpStrata } from '../../../HarpGuru'

export type YXCoord = [Coord, Coord]

export type HarpCellProps = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
  readonly activeDisplayMode: DisplayModes
  readonly yxCoord: YXCoord
}

export type HarpCellStyles = {
  readonly cell: ViewStyle
  readonly text: TextStyle
}
