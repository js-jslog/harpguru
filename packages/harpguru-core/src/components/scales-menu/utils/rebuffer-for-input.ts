import type { DegreeIds } from 'harpparts'

export const rebufferForInput = (
  activeDegrees: ReadonlyArray<DegreeIds>,
  targetActiveDegrees: ReadonlyArray<DegreeIds>
): ReadonlyArray<DegreeIds> => {
  if (activeDegrees.length === 0) return targetActiveDegrees
  return targetActiveDegrees
}
