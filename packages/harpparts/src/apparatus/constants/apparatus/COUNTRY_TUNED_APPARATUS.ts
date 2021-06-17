import { reedArrayToMatrices } from '../../utils'
import { ApparatusIds } from '../../types'
import type { Apparatus } from '../../types'
import { COUNTRY_TUNED_TUNING } from '../../../tuning'

const { CountryTuned: id } = ApparatusIds

export const COUNTRY_TUNED_APPARATUS: Apparatus = {
  id,
  ...reedArrayToMatrices(COUNTRY_TUNED_TUNING, id),
} as const
