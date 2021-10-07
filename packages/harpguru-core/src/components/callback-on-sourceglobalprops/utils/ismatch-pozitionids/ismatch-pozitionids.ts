import type { PozitionIds } from 'harpparts'

export const isMatchPozitionIds = (
  id1: PozitionIds,
  id2: PozitionIds
): boolean => {
  return id1 === id2
}
