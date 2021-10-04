import type { HarpStrata } from 'harpstrata'
import type { PozitionIds } from 'harpparts'

export const setFromHarpStrataToPozitionId = (
  newHarpStrata: HarpStrata,
  prevPozitionId: PozitionIds,
  setPozitionId: (arg0: PozitionIds) => void
): PozitionIds => {
  const { pozitionId: nextPozitionId } = newHarpStrata
  if (prevPozitionId !== nextPozitionId) setPozitionId(nextPozitionId)
  return nextPozitionId
}
