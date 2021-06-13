import type { Hole } from '../../types'

export const isHoleValid = (hole: Hole): boolean => {
  const hasConflictingDrawBends =
    hole.bends.length > 0 && hole.overdraws.length > 0
  return !hasConflictingDrawBends
}
