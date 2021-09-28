import type { ActiveIds } from 'harpstrata'

export const compareActiveIds = (ids1: ActiveIds, ids2: ActiveIds): boolean => {
  return Object.is(ids1, ids2)
}
