import { TuningIds } from '../../tuning'
import {
  MAJOR_DIATONIC_TUNING,
  COUNTRY_TUNED_TUNING,
  NATURAL_MINOR_TUNING,
  WILDE_TUNED_TUNING,
  POWER_BENDER_TUNING,
  POWER_DRAW_TUNING,
  MELODY_MAKER_TUNING,
  WOOZLE_MINOR_TUNING,
} from '../../tuning'
import type { Tuning } from '../../tuning'

export const orderedTunings = new Map<TuningIds, Tuning>()
orderedTunings.set(TuningIds.MajorDiatonic, MAJOR_DIATONIC_TUNING)
orderedTunings.set(TuningIds.CountryTuned, COUNTRY_TUNED_TUNING)
orderedTunings.set(TuningIds.NaturalMinor, NATURAL_MINOR_TUNING)
orderedTunings.set(TuningIds.WildeTuned, WILDE_TUNED_TUNING)
orderedTunings.set(TuningIds.PowerBender, POWER_BENDER_TUNING)
orderedTunings.set(TuningIds.PowerDraw, POWER_DRAW_TUNING)
orderedTunings.set(TuningIds.MelodyMaker, MELODY_MAKER_TUNING)
orderedTunings.set(TuningIds.WoozleMinor, WOOZLE_MINOR_TUNING)
