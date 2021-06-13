import type { Hole } from '../../types'

export const isHoleValid = (hole: Hole): boolean => {
  const hasConflictingDrawBends =
    hole.bends.length > 0 && hole.overdraws.length > 0
  const hasConflictingBlowBends =
    hole.blowbends.length > 0 && hole.overblows.length > 0
  return !hasConflictingDrawBends && !hasConflictingBlowBends
}
