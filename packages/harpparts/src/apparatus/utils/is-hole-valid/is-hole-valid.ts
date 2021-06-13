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
  NonconsecutiveBlowbends,
}

export const isHoleValid = (hole: Hole): HoleErrors[] => {
  const bendLimit = 5
  const overbendLimit = 2
  const { Ascending, Descending } = Direction

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
    !hole.bends.every(isConsecutiveWithPrevious.bind(undefined, Ascending)) &&
    !hole.bends.every(isConsecutiveWithPrevious.bind(undefined, Descending))
      ? [HoleErrors.NonconsecutiveBends]
      : []
  const nonconsecutiveBlowbends =
    !hole.blowbends.every(
      isConsecutiveWithPrevious.bind(undefined, Ascending)
    ) &&
    !hole.blowbends.every(isConsecutiveWithPrevious.bind(undefined, Descending))
      ? [HoleErrors.NonconsecutiveBlowbends]
      : []

  return [
    ...conflictingDrawBends,
    ...conflictingBlowBends,
    ...tooManyBends,
    ...tooManyBlowbends,
    ...tooManyOverblows,
    ...tooManyOverdraws,
    ...nonconsecutiveBends,
    ...nonconsecutiveBlowbends,
  ]
}
