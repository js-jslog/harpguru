import type { DegreeIds, PitchIds } from 'harpparts'

// TODO: I'd like the type safety to be a bit more intelligent here
// so that both parameters must be of the same type
export const isMatchActiveIds = (
  ids1: ReadonlyArray<DegreeIds | PitchIds>,
  ids2: ReadonlyArray<DegreeIds | PitchIds>
): boolean => {
  const match1 = ids1.every((item, index: number) => item === ids2[index])
  const match2 = ids2.every((item, index) => item === ids1[index])
  return match1 && match2
}
