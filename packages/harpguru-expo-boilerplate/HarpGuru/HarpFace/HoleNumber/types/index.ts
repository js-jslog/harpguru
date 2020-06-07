import type { ViewStyle, TextStyle } from 'react-native'

import type { Coord } from '../../HarpRow'

export enum HoleNumberIds {
  One = '1'      , Two = '2'      , Three = '3'   , Four = '4',
  Five = '5'     , Six = '6'      , Seven = '7'   , Eight = '8',
  Nine = '9'     , Ten = '10'     , Eleven = '11' , Twelve = '12',
  Thirteen = '13', Fourteen = '14', Fifteen = '15', Sixteen = '16',
}

export type HoleNumberProps = {
  readonly xCoord: Coord;
}

export type HoleNumberStyles = {
  readonly cell: ViewStyle;
  readonly text: TextStyle;
}
