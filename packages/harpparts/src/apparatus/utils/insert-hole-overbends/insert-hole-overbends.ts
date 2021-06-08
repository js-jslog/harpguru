import type { Hole } from '../../types'

export const insertHoleOverbends = (holeInput: Hole): Hole => {
  const { blow, draw } = holeInput
  if (blow < draw) return { ...holeInput, overblows: [draw + 1] }
  if (blow > draw) return { ...holeInput, overdraws: [blow + 1] }
  return { ...holeInput }
}
