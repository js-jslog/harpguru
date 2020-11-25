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

export const ORDERED_POZITIONS: Record<PozitionIds, Pozition> = {
  [PozitionIds.First]: FIRST,
  [PozitionIds.Second]: SECOND,
  [PozitionIds.Third]: THIRD,
  [PozitionIds.Fourth]: FOURTH,
  [PozitionIds.Fifth]: FIFTH,
  [PozitionIds.Sixth]: SIXTH,
  [PozitionIds.Seventh]: SEVENTH,
  [PozitionIds.Eighth]: EIGHTH,
  [PozitionIds.Ninth]: NINTH,
  [PozitionIds.Tenth]: TENTH,
  [PozitionIds.Eleventh]: ELEVENTH,
  [PozitionIds.Twelfth]: TWELFTH,
} as const
