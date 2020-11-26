import { DegreeIds } from 'harpparts'

import type { ColorSheme } from '../styles-types'

const red = '#f94144'
const burntRed = '#c8553d'
const orange = '#f8961e'
const skyBlue = '#6699cc'
const yellow = '#f9c74f'
const limeGreen = '#90be6d'
const aubergine = '#aa4465'
const mossGreen = '#43aa8b'
const coal = '#484a47'
const deepBlue = '#577590'
const grey = '#5c6d70'
const mauve = '#6d597a'

const degreeColors = {
  [DegreeIds.Root]: red,
  [DegreeIds.Flat2]: burntRed,
  [DegreeIds.Second]: orange,
  [DegreeIds.Flat3]: skyBlue,
  [DegreeIds.Third]: yellow,
  [DegreeIds.Fourth]: limeGreen,
  [DegreeIds.Flat5]: aubergine,
  [DegreeIds.Fifth]: mossGreen,
  [DegreeIds.Flat6]: coal,
  [DegreeIds.Sixth]: deepBlue,
  [DegreeIds.Flat7]: grey,
  [DegreeIds.Seventh]: mauve,
} as const

const pageColor = '#fefefe' as const
const homeRowsColor = '#eee' as const
const inertOutline = '#ddd' as const
const activeOutline = '#ddd' as const
const holeNumbersColor = '#495057' as const

export const colors: ColorSheme = {
  pageColor,
  degreeColors,
  homeRowsColor,
  inertOutline,
  activeOutline,
  holeNumbersColor,
} as const
