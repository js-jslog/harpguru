import { DegreeIds } from 'harpstrata'
import type { Degree, DegreeRow } from 'harpstrata'

export const arrayHasRoot = (degreeRow: DegreeRow): boolean => {
  return degreeRow.some(
    (degree: Degree | undefined) => degree && degree.id === DegreeIds.Root
  )
}
