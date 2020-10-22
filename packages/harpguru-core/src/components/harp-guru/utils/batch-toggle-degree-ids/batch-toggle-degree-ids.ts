import type { ActiveDegreeIds } from 'harpstrata'

export const batchToggleDegreeIds = (activeDegreeIds: ActiveDegreeIds, batchToggleIds: ActiveDegreeIds): ActiveDegreeIds => {
  const toggleOnList = batchToggleIds.filter(id => !activeDegreeIds.includes(id))
  const toggleOffList = batchToggleIds.filter(id => activeDegreeIds.includes(id))
  return [ ...activeDegreeIds, ...toggleOnList ].filter(id => !toggleOffList.includes(id))
}
