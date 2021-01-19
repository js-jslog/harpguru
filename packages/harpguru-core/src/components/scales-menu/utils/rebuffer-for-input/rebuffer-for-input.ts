import type { DegreeIds } from 'harpparts'

export const rebufferForInput = (
  activeDegrees: ReadonlyArray<DegreeIds>,
  targetActiveDegrees: ReadonlyArray<DegreeIds>
): ReadonlyArray<DegreeIds> => {
  const toggleOffs = activeDegrees.filter(
    (degreeId) => !targetActiveDegrees.includes(degreeId)
  )
  const toggleOns = targetActiveDegrees.filter(
    (degreeId) => !activeDegrees.includes(degreeId)
  )

  return [...toggleOffs, ...toggleOns]
}
