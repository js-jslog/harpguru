import { reedArrayToMatrices } from '../../utils'
import type { Apparatus } from '../../types'
import { WOOZLE_MINOR_TUNING } from '../../../tuning'

const { id, reedArray } = WOOZLE_MINOR_TUNING

export const WOOZLE_MINOR_APPARATUS: Apparatus = {
  id: id,
  ...reedArrayToMatrices(reedArray, id),
} as const
