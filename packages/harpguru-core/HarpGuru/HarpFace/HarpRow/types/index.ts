import type { ViewStyle } from 'react-native'

import type { HarpFaceProps } from '../../types'

export type Coord = number

export type HarpRowProps = HarpFaceProps & {
  readonly yCoord: Coord;
};

export type HarpRowStyles = {
  readonly row: ViewStyle;
}
