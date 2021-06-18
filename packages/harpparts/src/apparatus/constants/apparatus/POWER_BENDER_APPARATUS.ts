import { reedArrayToMatrices } from '../../utils'
import type { Apparatus } from '../../types'
import { POWER_BENDER_TUNING } from '../../../tuning'

const { id, reedArray } = POWER_BENDER_TUNING

export const POWER_BENDER_APPARATUS: Apparatus = {
  id: id,
  ...reedArrayToMatrices(reedArray, id),
} as const
