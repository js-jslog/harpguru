import { TuningIds } from '../../tuning'
import {
  MAJOR_DIATONIC_TUNING,
  COUNTRY_TUNED_TUNING,
  NATURAL_MINOR_TUNING,
  WILDE_TUNED_TUNING,
  POWER_BENDER_TUNING,
  POWER_DRAW_TUNING,
  WOOZLE_MINOR_TUNING,
} from '../../tuning'
import type { Tuning } from '../../tuning'

export const ORDERED_TUNINGS = new Map<TuningIds, Tuning>()
ORDERED_TUNINGS.set(TuningIds.MajorDiatonic, MAJOR_DIATONIC_TUNING)
ORDERED_TUNINGS.set(TuningIds.CountryTuned, COUNTRY_TUNED_TUNING)
ORDERED_TUNINGS.set(TuningIds.NaturalMinor, NATURAL_MINOR_TUNING)
ORDERED_TUNINGS.set(TuningIds.WildeTuned, WILDE_TUNED_TUNING)
ORDERED_TUNINGS.set(TuningIds.PowerBender, POWER_BENDER_TUNING)
ORDERED_TUNINGS.set(TuningIds.PowerDraw, POWER_DRAW_TUNING)
ORDERED_TUNINGS.set(TuningIds.WoozleMinor, WOOZLE_MINOR_TUNING)
