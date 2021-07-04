import type { ReedPairArray } from '../../types'
import type { ReedArray } from '../../../tuning'

export const pivotReedArray = (reedArray: ReedArray): ReedPairArray => {
  const [blowRow, drawRow] = reedArray
  return [
    [blowRow[0], drawRow[0]],
    [blowRow[1], drawRow[1]],
    [blowRow[2], drawRow[2]],
    [blowRow[3], drawRow[3]],
    [blowRow[4], drawRow[4]],
    [blowRow[5], drawRow[5]],
    [blowRow[6], drawRow[6]],
    [blowRow[7], drawRow[7]],
    [blowRow[8], drawRow[8]],
    [blowRow[9], drawRow[9]],
  ]
}
