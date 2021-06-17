import { reedArrayToMatrices } from '../../utils'
import { ApparatusIds } from '../../types'
import type { Apparatus } from '../../types'
import { MAJOR_DIATONIC_TUNING } from '../../../tuning'

const { MajorDiatonic: id } = ApparatusIds

export const MAJOR_DIATONIC_APPARATUS: Apparatus = {
  id,
  ...reedArrayToMatrices(MAJOR_DIATONIC_TUNING, id),
} as const
