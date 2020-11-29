import { PozitionIds } from '../../pozition'
import {
  FIRST,
  SECOND,
  THIRD,
  FOURTH,
  FIFTH,
  SIXTH,
  SEVENTH,
  EIGHTH,
  NINTH,
  TENTH,
  ELEVENTH,
  TWELFTH,
} from '../../pozition'
import type { Pozition } from '../../pozition'

export const ORDERED_POZITIONS = new Map<PozitionIds, Pozition>()
ORDERED_POZITIONS.set(PozitionIds.First, FIRST)
ORDERED_POZITIONS.set(PozitionIds.Second, SECOND)
ORDERED_POZITIONS.set(PozitionIds.Third, THIRD)
ORDERED_POZITIONS.set(PozitionIds.Fourth, FOURTH)
ORDERED_POZITIONS.set(PozitionIds.Fifth, FIFTH)
ORDERED_POZITIONS.set(PozitionIds.Sixth, SIXTH)
ORDERED_POZITIONS.set(PozitionIds.Seventh, SEVENTH)
ORDERED_POZITIONS.set(PozitionIds.Eighth, EIGHTH)
ORDERED_POZITIONS.set(PozitionIds.Ninth, NINTH)
ORDERED_POZITIONS.set(PozitionIds.Tenth, TENTH)
ORDERED_POZITIONS.set(PozitionIds.Eleventh, ELEVENTH)
ORDERED_POZITIONS.set(PozitionIds.Twelfth, TWELFTH)
