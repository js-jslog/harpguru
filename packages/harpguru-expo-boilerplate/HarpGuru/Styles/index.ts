import { DegreeIds } from 'harpstrata'

const seedSize = 1.1

export const themeSizes = {
  1: seedSize *1,
  2: seedSize *1.618,
  3: seedSize *2.618,
  4: seedSize *4.236,
  5: seedSize *6.854,
  6: seedSize *11.090,
  7: seedSize *17.944,
  8: seedSize *29.034,
  9: seedSize *46.979,
  10: seedSize *76.013,
} as const

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
const homeRowsColor = '#eee' as const
const inertOutline = '#ddd' as const
const holeNumbersColor = '#495057' as const

export const themeColors = {
  pageColor,
  degreeColors,
  homeRowsColor,
  inertOutline,
  holeNumbersColor,
} as const
