import type { Hole } from '../../types'

export enum HoleErrors {
  ConflictingDrawBends,
  ConflictingBlowBends,
  TooManyBends,
  TooManyBlowbends,
  TooManyOverblows,
}

export const isHoleValid = (hole: Hole): HoleErrors[] => {
  const bendLimit = 5
  const overbendLimit = 2

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
  const tooManyBlowbends =
    hole.blowbends.length > bendLimit ? [HoleErrors.TooManyBlowbends] : []
  const tooManyOverblows =
    hole.overblows.length > overbendLimit ? [HoleErrors.TooManyOverblows] : []

  return [
    ...conflictingDrawBends,
    ...conflictingBlowBends,
    ...tooManyBends,
    ...tooManyBlowbends,
    ...tooManyOverblows,
  ]
}
