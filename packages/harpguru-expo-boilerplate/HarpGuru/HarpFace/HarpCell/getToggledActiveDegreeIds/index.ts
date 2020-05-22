import type { DegreeIds, ActiveDegreeIds } from 'harpstrata'

export const getToggledActiveDegreeIds = (degreeId: DegreeIds, activeDegreeIds: ActiveDegreeIds): ActiveDegreeIds => {
  if (activeDegreeIds.includes(degreeId)) {
    const arrayHead = activeDegreeIds.slice(0, activeDegreeIds.indexOf(degreeId))
    const arrayTail = activeDegreeIds.slice(activeDegreeIds.indexOf(degreeId) +1)
    return [ ...arrayHead, ...arrayTail ]
  } else {
    return [ ...activeDegreeIds, degreeId ]
  }
}
