import type { HarpStrata } from 'harpstrata'
import type { PozitionIds } from 'harpparts'

export const reduceHarpStrataToPozitionId = (
  prevPozitionId: PozitionIds,
  harpStrata: HarpStrata
): PozitionIds => {
  const { pozitionId: nextPozitionId } = harpStrata
  if (prevPozitionId === nextPozitionId) return prevPozitionId
  return nextPozitionId
}
