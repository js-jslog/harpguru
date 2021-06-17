import { reedArrayToMatrices } from '../../utils'
import { ApparatusIds } from '../../types'
import type { Apparatus } from '../../types'
import { POWER_DRAW_TUNING } from '../../../tuning'

const { PowerDraw: id } = ApparatusIds

export const POWER_DRAW_APPARATUS: Apparatus = {
  id,
  ...reedArrayToMatrices(POWER_DRAW_TUNING, id),
} as const
