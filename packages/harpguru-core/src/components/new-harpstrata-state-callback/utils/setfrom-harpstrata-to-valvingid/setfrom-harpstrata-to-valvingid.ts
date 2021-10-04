import type { HarpStrata } from 'harpstrata'
import type { ValvingIds } from 'harpparts'

export const setFromHarpStrataToValvingId = (
  newHarpStrata: HarpStrata,
  prevValvingId: ValvingIds,
  setValvingId: (arg0: ValvingIds) => void
): ValvingIds => {
  const {
    apparatus: { valvingId: nextValvingId },
  } = newHarpStrata
  if (prevValvingId !== nextValvingId) setValvingId(nextValvingId)
  return nextValvingId
}
