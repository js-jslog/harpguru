import { DegreeIds } from 'harpparts'

import type { ColorSheme } from '../styles-types'

const degreeColors = {
  [DegreeIds.Root]: '#0f9d58',
  [DegreeIds.Flat2]: '#8ac926',
  [DegreeIds.Second]: '#323031',
  [DegreeIds.Flat3]: '#f18701',
  [DegreeIds.Third]: '#f4b400',
  [DegreeIds.Fourth]: '#6a4c93',
  [DegreeIds.Flat5]: '#175676',
  [DegreeIds.Fifth]: '#4285f4',
  [DegreeIds.Flat6]: '#e07a5f',
  [DegreeIds.Sixth]: '#da627d',
  [DegreeIds.Flat7]: '#f72585',
  [DegreeIds.Seventh]: '#db4437',
} as const

const pageColor = '#fefefe' as const
const homeRowsColor = '#ddd' as const
const inertOutline = '#555' as const
const activeOutline = 'black' as const
const holeNumbersColor = inertOutline

export const colors: ColorSheme = {
  pageColor,
  degreeColors,
  homeRowsColor,
  inertOutline,
  activeOutline,
  holeNumbersColor,
} as const
