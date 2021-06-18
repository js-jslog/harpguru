import { reedArrayToMatrices } from '../../utils'
import type { Apparatus } from '../../types'
import { WILDE_TUNED_TUNING } from '../../../tuning'

const { id, reedArray } = WILDE_TUNED_TUNING

export const WILDE_TUNED_APPARATUS: Apparatus = {
  id: id,
  ...reedArrayToMatrices(reedArray, id),
} as const
