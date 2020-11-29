import { DegreeIds } from 'harpparts'
import type { Degree, HarpFaceRow } from 'harpparts'

export const arrayHasRoot = (degreeRow: HarpFaceRow<Degree>): boolean => {
  return degreeRow.some(
    (degree: Degree | undefined) => degree && degree.id === DegreeIds.Root
  )
}
