import { reedArrayToMatrices } from '../../utils'
import { ApparatusIds } from '../../types'
import type { Apparatus } from '../../types'
import { WOOZLE_MINOR_TUNING } from '../../../tuning'

const { WoozleMinor: id } = ApparatusIds

export const WOOZLE_MINOR_APPARATUS: Apparatus = {
  id,
  ...reedArrayToMatrices(WOOZLE_MINOR_TUNING, id),
} as const
