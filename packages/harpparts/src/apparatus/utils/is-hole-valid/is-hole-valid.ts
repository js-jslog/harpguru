import type { Hole } from '../../types'
import {
  isConsecutiveWithPrevious,
  Direction,
} from '../../../packages/is-consecutive-with-previous'

export enum HoleErrors {
  ConflictingDrawBends,
  ConflictingBlowBends,
  TooManyBends,
  TooManyBlowbends,
  TooManyOverblows,
  TooManyOverdraws,
  NonconsecutiveBends,
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
  const tooManyOverdraws =
    hole.overdraws.length > overbendLimit ? [HoleErrors.TooManyOverdraws] : []
  const nonconsecutiveBends =
    !hole.bends.every(
      isConsecutiveWithPrevious.bind(undefined, Direction.Ascending)
    ) &&
    !hole.bends.every(
      isConsecutiveWithPrevious.bind(undefined, Direction.Descending)
    )
      ? [HoleErrors.NonconsecutiveBends]
      : []

  return [
    ...conflictingDrawBends,
    ...conflictingBlowBends,
    ...tooManyBends,
    ...tooManyBlowbends,
    ...tooManyOverblows,
    ...tooManyOverdraws,
    ...nonconsecutiveBends,
  ]
}
