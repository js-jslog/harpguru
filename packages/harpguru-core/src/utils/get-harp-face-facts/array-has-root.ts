import type { Degree, DegreeRow } from 'harpstrata'
import { DegreeIds } from 'harpparts'

export const arrayHasRoot = (degreeRow: DegreeRow): boolean => {
  return degreeRow.some(
    (degree: Degree | undefined) => degree && degree.id === DegreeIds.Root
  )
}
