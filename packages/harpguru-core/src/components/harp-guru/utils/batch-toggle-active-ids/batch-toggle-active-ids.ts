import type { ActiveDegreeIds } from 'harpstrata'

export const batchToggleActiveIds = (
  activeDegreeIds: ActiveDegreeIds,
  bufferedActiveToggles: ActiveDegreeIds
): ActiveDegreeIds => {
  const toggleOnList = bufferedActiveToggles.filter(
    (id) => !activeDegreeIds.includes(id)
  )
  const toggleOffList = bufferedActiveToggles.filter((id) =>
    activeDegreeIds.includes(id)
  )
  return [...activeDegreeIds, ...toggleOnList].filter(
    (id) => !toggleOffList.includes(id)
  )
}
