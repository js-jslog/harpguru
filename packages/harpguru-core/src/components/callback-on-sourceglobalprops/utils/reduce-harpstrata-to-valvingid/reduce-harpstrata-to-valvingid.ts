import type { HarpStrata } from 'harpstrata'
import type { ValvingIds } from 'harpparts'

export const reduceHarpStrataToValvingId = (
  prevValvingId: ValvingIds,
  harpStrata: HarpStrata
): ValvingIds => {
  const {
    apparatus: { valvingId: nextValvingId },
  } = harpStrata
  if (prevValvingId === nextValvingId) return prevValvingId
  return nextValvingId
}
