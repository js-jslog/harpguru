import { reedArrayToMatrices } from '../../utils'
import type { Apparatus } from '../../types'
import { COUNTRY_TUNED_TUNING } from '../../../tuning'

const { id, reedArray } = COUNTRY_TUNED_TUNING

export const COUNTRY_TUNED_APPARATUS: Apparatus = {
  id: id,
  ...reedArrayToMatrices(reedArray, id),
} as const
