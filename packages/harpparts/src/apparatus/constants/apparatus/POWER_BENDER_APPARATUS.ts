import { reedArrayToMatrices } from '../../utils'
import { ApparatusIds } from '../../types'
import type { Apparatus } from '../../types'
import { POWER_BENDER_TUNING } from '../../../tuning'

const { PowerBender: id } = ApparatusIds

export const POWER_BENDER_APPARATUS: Apparatus = {
  id,
  ...reedArrayToMatrices(POWER_BENDER_TUNING, id),
} as const
