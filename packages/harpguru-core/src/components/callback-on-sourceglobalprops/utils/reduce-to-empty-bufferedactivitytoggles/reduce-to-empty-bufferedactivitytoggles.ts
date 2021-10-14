import type { DegreeIds } from 'harpparts'

export const reduceToEmptyBufferedActivityToggles = (
  prevBufferedActivityToggles: ReadonlyArray<DegreeIds>
): ReadonlyArray<DegreeIds> => {
  if (prevBufferedActivityToggles.length === 0)
    return prevBufferedActivityToggles
  return []
}
