import type { Hole } from '../../types'

export enum HoleErrors {
  ConflictingDrawBends,
  ConflictingBlowBends,
  TooManyBends,
}

export const isHoleValid = (hole: Hole): HoleErrors[] => {
  const bendLimit = 5

  const errorArray = []

  const hasConflictingDrawBends =
    hole.bends.length > 0 && hole.overdraws.length > 0
  const hasConflictingBlowBends =
    hole.blowbends.length > 0 && hole.overblows.length > 0
  const hasTooManyBends = hole.bends.length > bendLimit

  if (hasConflictingDrawBends) errorArray.push(HoleErrors.ConflictingDrawBends)
  if (hasConflictingBlowBends) errorArray.push(HoleErrors.ConflictingBlowBends)
  if (hasTooManyBends) errorArray.push(HoleErrors.TooManyBends)

  return errorArray
}
