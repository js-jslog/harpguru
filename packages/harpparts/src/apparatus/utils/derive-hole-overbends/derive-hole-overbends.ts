import type { Hole } from '../../types'

export const deriveHoleOverbends = (holeInput: Hole): Hole => {
  const { blow, draw } = holeInput
  if (blow < draw) return { ...holeInput, overblow: [draw + 1] }
  if (blow > draw) return { ...holeInput, overdraw: [blow + 1] }
  return { ...holeInput }
}
