import { getHarpStrata } from 'harpstrata'
import type { HarpStrata, HarpStrataProps, DegreeIds } from 'harpstrata'

import { getToggledActiveDegreeIds } from '../getToggledActiveDegreeIds'

export const toggleDegreeIdInHarpStrata = (activeHarpStrata: HarpStrata, toggledDegreeId: DegreeIds): HarpStrata => {
  const { apparatus: { id: apparatusId }, pozitionId, harpKeyId, isActiveComplex: { activeDegreeIds }} = activeHarpStrata

  const newActiveDegreeIds = getToggledActiveDegreeIds(toggledDegreeId, activeDegreeIds)
  const activeIds = newActiveDegreeIds

  const newHarpStrataProps: HarpStrataProps = {
    apparatusId, pozitionId, harpKeyId, activeIds
  }

  return getHarpStrata(newHarpStrataProps)
}
