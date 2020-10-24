import type { DegreeIds } from 'harpstrata'

export const batchToggleDegreeIds = (
  activeDegreeIds: ReadonlyArray<DegreeIds>,
  degreeIdsToToggle: ReadonlyArray<DegreeIds>
): ReadonlyArray<DegreeIds> => {
  const toggleOnList = degreeIdsToToggle.filter(
    (id) => !activeDegreeIds.includes(id)
  )
  const toggleOffList = degreeIdsToToggle.filter((id) =>
    activeDegreeIds.includes(id)
  )
  return [...activeDegreeIds, ...toggleOnList].filter(
    (id) => !toggleOffList.includes(id)
  )
}
