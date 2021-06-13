import type { Hole } from '../../types'

export const isHoleValid = (hole: Hole): boolean => {
  const bendLimit = 5

  const hasConflictingDrawBends =
    hole.bends.length > 0 && hole.overdraws.length > 0
  const hasConflictingBlowBends =
    hole.blowbends.length > 0 && hole.overblows.length > 0
  const hasTooManyBends = hole.bends.length > bendLimit

  return (
    !hasConflictingDrawBends && !hasConflictingBlowBends && !hasTooManyBends
  )
}
