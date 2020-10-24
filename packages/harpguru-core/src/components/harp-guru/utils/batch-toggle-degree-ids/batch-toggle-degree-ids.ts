import type { DegreeIds } from 'harpstrata'

export const batchToggleDegreeIds = (
  activeDegreeIds: ReadonlyArray<DegreeIds>,
  bufferedActivityToggles: ReadonlyArray<DegreeIds>
): ReadonlyArray<DegreeIds> => {
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
