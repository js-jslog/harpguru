import { reedArrayToMatrices } from '../../utils'
import { ApparatusIds } from '../../types'
import type { Apparatus } from '../../types'
import { NATURAL_MINOR_TUNING } from '../../../tuning'

const { NaturalMinor: id } = ApparatusIds

export const NATURAL_MINOR_APPARATUS: Apparatus = {
  id,
  ...reedArrayToMatrices(NATURAL_MINOR_TUNING, id),
} as const
