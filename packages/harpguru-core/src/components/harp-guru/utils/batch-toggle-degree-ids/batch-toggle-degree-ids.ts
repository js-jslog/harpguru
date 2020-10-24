import type { ActiveDegreeIds } from 'harpstrata'

export const batchToggleDegreeIds = (
  activeDegreeIds: ActiveDegreeIds,
  bufferedActivityToggles: ActiveDegreeIds
): ActiveDegreeIds => {
  const toggleOnList = bufferedActivityToggles.filter(
    (id) => !activeDegreeIds.includes(id)
  )
  const toggleOffList = bufferedActivityToggles.filter((id) =>
    activeDegreeIds.includes(id)
  )
  return [...activeDegreeIds, ...toggleOnList].filter(
    (id) => !toggleOffList.includes(id)
  )
}
