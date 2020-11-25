import {
  ApparatusIds,
  COUNTRY_TUNED_APPARATUS,
  NATURAL_MINOR_APPARATUS,
  POWER_BENDER_APPARATUS,
  WILDE_TUNED_APPARATUS,
} from '../../apparatus'
import { MAJOR_DIATONIC_APPARATUS } from '../../apparatus'
import type { Apparatus } from '../../apparatus'

export const ORDERED_APPARATUS: Record<ApparatusIds, Apparatus> = {
  [ApparatusIds.MajorDiatonic]: MAJOR_DIATONIC_APPARATUS,
  [ApparatusIds.CountryTuned]: COUNTRY_TUNED_APPARATUS,
  [ApparatusIds.NaturalMinor]: NATURAL_MINOR_APPARATUS,
  [ApparatusIds.WildeTuned]: WILDE_TUNED_APPARATUS,
  [ApparatusIds.PowerBender]: POWER_BENDER_APPARATUS,
} as const
