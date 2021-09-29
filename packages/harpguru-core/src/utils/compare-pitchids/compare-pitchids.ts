import type { PitchIds } from 'harpparts'

// TODO: Should this be defined in harpparts?
export const comparePitchIds = (id1: PitchIds, id2: PitchIds): boolean => {
  return Object.is(id1, id2)
}
