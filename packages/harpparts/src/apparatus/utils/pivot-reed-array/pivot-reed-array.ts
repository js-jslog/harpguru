import type { ReedPairArray } from '../../types'
import type { ReedArray } from '../../../tuning'
import { isReedArray7, isReedArray10 } from '../../../tuning'

export const pivotReedArray = (reedArray: ReedArray): ReedPairArray => {
  if (isReedArray10(reedArray)) {
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
  if (isReedArray7(reedArray)) {
    const [blowRow, drawRow] = reedArray
    return [
      [blowRow[0], drawRow[0]],
      [blowRow[1], drawRow[1]],
      [blowRow[2], drawRow[2]],
      [blowRow[3], drawRow[3]],
      [blowRow[4], drawRow[4]],
      [blowRow[5], drawRow[5]],
      [blowRow[6], drawRow[6]],
    ]
  }
  const errorMessage = `
    ReedArray for pivoting did not match anticipated length.

    Input: ${JSON.stringify(reedArray)}
  `
  throw new Error(errorMessage)
}
