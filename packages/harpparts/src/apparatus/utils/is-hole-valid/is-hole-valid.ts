import type { Hole } from '../../types'

export enum HoleErrors {
  ConflictingDrawBends,
  ConflictingBlowBends,
  TooManyBends,
}

export const isHoleValid = (hole: Hole): HoleErrors[] => {
  const bendLimit = 5

  const conflictingDrawBends =
    hole.bends.length > 0 && hole.overdraws.length > 0
      ? [HoleErrors.ConflictingDrawBends]
      : []
  const conflictingBlowBends =
    hole.blowbends.length > 0 && hole.overblows.length > 0
      ? [HoleErrors.ConflictingBlowBends]
      : []
  const tooManyBends =
    hole.bends.length > bendLimit ? [HoleErrors.TooManyBends] : []

  return [...conflictingDrawBends, ...conflictingBlowBends, ...tooManyBends]
}
