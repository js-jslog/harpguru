import { SizeScheme } from '../styles-types'

const seedSize = 1.1

export const sizes: SizeScheme = {
  1: seedSize * 1,
  2: seedSize * 1.618,
  3: seedSize * 2.618,
  4: seedSize * 4.236,
  5: seedSize * 6.854,
  6: seedSize * 11.09,
  7: seedSize * 17.944,
  8: seedSize * 29.034,
  9: seedSize * 46.979,
  10: seedSize * 76.013,
} as const
