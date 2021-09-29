import type { PozitionIds } from 'harpparts'

// TODO: I've decided to define this locally to the reducer to keep track of whether
// it's actually going to be used elsewhere and keep it encapsulated if not. This is
// a break from what has been done so far with the other reducers and compare functions
// which were intended to have such a move applied later, because it's just getting a bit
// too crowded in the utils folder now.
//
// However, immediately upon creating it I now wonder whether this should be a util provided
// by the harpparts project. This and some others too perhaps.
export const comparePozitionIds = (
  id1: PozitionIds,
  id2: PozitionIds
): boolean => {
  return Object.is(id1, id2)
}
