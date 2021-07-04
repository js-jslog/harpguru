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

export const orderedPozitions = new Map<PozitionIds, Pozition>()
orderedPozitions.set(PozitionIds.First, FIRST)
orderedPozitions.set(PozitionIds.Second, SECOND)
orderedPozitions.set(PozitionIds.Third, THIRD)
orderedPozitions.set(PozitionIds.Fourth, FOURTH)
orderedPozitions.set(PozitionIds.Fifth, FIFTH)
orderedPozitions.set(PozitionIds.Sixth, SIXTH)
orderedPozitions.set(PozitionIds.Seventh, SEVENTH)
orderedPozitions.set(PozitionIds.Eighth, EIGHTH)
orderedPozitions.set(PozitionIds.Ninth, NINTH)
orderedPozitions.set(PozitionIds.Tenth, TENTH)
orderedPozitions.set(PozitionIds.Eleventh, ELEVENTH)
orderedPozitions.set(PozitionIds.Twelfth, TWELFTH)
