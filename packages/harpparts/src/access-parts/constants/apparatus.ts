import { ApparatusIds } from '../../apparatus'
import {
  MAJOR_DIATONIC_APPARATUS,
  COUNTRY_TUNED_APPARATUS,
  NATURAL_MINOR_APPARATUS,
  POWER_BENDER_APPARATUS,
  WILDE_TUNED_APPARATUS,
} from '../../apparatus'
import type { Apparatus } from '../../apparatus'

export const ORDERED_APPARATUS = new Map<ApparatusIds, Apparatus>()
ORDERED_APPARATUS.set(ApparatusIds.MajorDiatonic, MAJOR_DIATONIC_APPARATUS)
ORDERED_APPARATUS.set(ApparatusIds.CountryTuned, COUNTRY_TUNED_APPARATUS)
ORDERED_APPARATUS.set(ApparatusIds.NaturalMinor, NATURAL_MINOR_APPARATUS)
ORDERED_APPARATUS.set(ApparatusIds.WildeTuned, WILDE_TUNED_APPARATUS)
ORDERED_APPARATUS.set(ApparatusIds.PowerBender, POWER_BENDER_APPARATUS)
