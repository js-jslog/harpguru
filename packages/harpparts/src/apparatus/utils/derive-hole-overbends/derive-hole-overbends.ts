import type { Hole } from '../../types'

export const deriveHoleOverbends = (holeInput: Hole): Hole => {
  const { blow, draw } = holeInput
  if (blow < draw) return { ...holeInput, overblow: [draw + 1] }
  return { ...holeInput, overdraw: [blow + 1] }
}
