import { TuningIds } from '../../tuning'
import {
  MAJOR_DIATONIC,
  COUNTRY_TUNED,
  NATURAL_MINOR,
  HARMONIC_MINOR,
  POWER_BENDER,
  POWER_DRAW,
  PADDY_RICHTER,
  MELODY_MAKER,
  WILDE_TUNED,
  WOOZLE_MINOR,
  AUGMENTED_SPANISH,
  SPIRAL_CIRCULAR,
} from '../../tuning'
import type { Tuning } from '../../tuning'

export const orderedTunings = new Map<TuningIds, Tuning>()
orderedTunings.set(TuningIds.MajorDiatonic, MAJOR_DIATONIC)
orderedTunings.set(TuningIds.CountryTuned, COUNTRY_TUNED)
orderedTunings.set(TuningIds.NaturalMinor, NATURAL_MINOR)
orderedTunings.set(TuningIds.HarmonicMinor, HARMONIC_MINOR)
orderedTunings.set(TuningIds.WildeTuned, WILDE_TUNED)
orderedTunings.set(TuningIds.PowerBender, POWER_BENDER)
orderedTunings.set(TuningIds.PowerDraw, POWER_DRAW)
orderedTunings.set(TuningIds.PowerDraw, PADDY_RICHTER)
orderedTunings.set(TuningIds.MelodyMaker, MELODY_MAKER)
orderedTunings.set(TuningIds.WoozleMinor, WOOZLE_MINOR)
orderedTunings.set(TuningIds.WoozleMinor, AUGMENTED_SPANISH)
orderedTunings.set(TuningIds.WoozleMinor, SPIRAL_CIRCULAR)
