import type { HarpStrata } from 'harpstrata'
import type { ValvingIds } from 'harpparts'

export const setFromHarpStrataToValvingId = (
  harpStrata: HarpStrata,
  prevValvingId: ValvingIds,
  setValvingId: (arg0: ValvingIds) => void
): ValvingIds => {
  const {
    apparatus: { valvingId: nextValvingId },
  } = harpStrata
  if (prevValvingId !== nextValvingId) setValvingId(nextValvingId)
  return nextValvingId
}
