import { reedArrayToMatrices } from '../../utils'
import { ApparatusIds } from '../../types'
import type { Apparatus } from '../../types'
import { WILDE_TUNED_TUNING } from '../../../tuning'

const { WildeTuned: id } = ApparatusIds

export const WILDE_TUNED_APPARATUS: Apparatus = {
  id,
  ...reedArrayToMatrices(WILDE_TUNED_TUNING, id),
} as const
