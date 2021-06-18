import { reedArrayToMatrices } from '../../utils'
import type { Apparatus } from '../../types'
import { NATURAL_MINOR_TUNING } from '../../../tuning'

const { id, reedArray } = NATURAL_MINOR_TUNING

export const NATURAL_MINOR_APPARATUS: Apparatus = {
  id: id,
  ...reedArrayToMatrices(reedArray, id),
} as const
