import type { ActiveDegreeIds } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

export const setToEmptyBufferedActivityToggles = (
  prevBufferedActivityToggles: ReadonlyArray<DegreeIds>,
  setBufferedActivityToggles: (arg0: ReadonlyArray<DegreeIds>) => void
): ActiveDegreeIds => {
  if (prevBufferedActivityToggles.length === 0)
    return prevBufferedActivityToggles
  const nextBufferedActivityToggles = [] as ReadonlyArray<DegreeIds>
  setBufferedActivityToggles(nextBufferedActivityToggles)
  return nextBufferedActivityToggles
}
