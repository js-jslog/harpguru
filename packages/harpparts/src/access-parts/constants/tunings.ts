import { TuningIds } from '../../tuning'
import {
  RICHTER,
  COUNTRY,
  NATURAL_MINOR,
  HARMONIC_MINOR,
  POWER_BENDER,
  POWER_DRAW,
  PADDY_RICHTER,
  MELODY_MAKER,
  WILDE,
  WOOZLE_MINOR,
  AUGMENTED_SPANISH,
  SPIRAL_CIRCULAR,
} from '../../tuning'
import type { Tuning } from '../../tuning'

export const orderedTunings = new Map<TuningIds, Tuning>()
orderedTunings.set(TuningIds.Richter, RICHTER)
orderedTunings.set(TuningIds.Country, COUNTRY)
orderedTunings.set(TuningIds.NaturalMinor, NATURAL_MINOR)
orderedTunings.set(TuningIds.HarmonicMinor, HARMONIC_MINOR)
orderedTunings.set(TuningIds.Wilde, WILDE)
orderedTunings.set(TuningIds.PowerBender, POWER_BENDER)
orderedTunings.set(TuningIds.PowerDraw, POWER_DRAW)
orderedTunings.set(TuningIds.PowerDraw, PADDY_RICHTER)
orderedTunings.set(TuningIds.MelodyMaker, MELODY_MAKER)
orderedTunings.set(TuningIds.WoozleMinor, WOOZLE_MINOR)
orderedTunings.set(TuningIds.WoozleMinor, AUGMENTED_SPANISH)
orderedTunings.set(TuningIds.WoozleMinor, SPIRAL_CIRCULAR)
