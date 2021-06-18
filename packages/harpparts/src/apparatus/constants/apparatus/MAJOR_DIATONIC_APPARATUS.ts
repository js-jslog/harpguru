import { reedArrayToMatrices } from '../../utils'
import type { Apparatus } from '../../types'
import { MAJOR_DIATONIC_TUNING } from '../../../tuning'

const { id, reedArray } = MAJOR_DIATONIC_TUNING

export const MAJOR_DIATONIC_APPARATUS: Apparatus = {
  id: id,
  ...reedArrayToMatrices(reedArray, id),
} as const
