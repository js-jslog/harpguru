import { reedArrayToMatrices } from '../../utils'
import type { Apparatus } from '../../types'
import { POWER_DRAW_TUNING } from '../../../tuning'

const { id, reedArray } = POWER_DRAW_TUNING

export const POWER_DRAW_APPARATUS: Apparatus = {
  id: id,
  ...reedArrayToMatrices(reedArray, id),
} as const
