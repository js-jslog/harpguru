import type { ReedArray, ReedArray7, ReedArray10 } from './tuning-types'

export const isReedArray7 = (reedArray: ReedArray): reedArray is ReedArray7 => {
  const [blowRow, drawRow] = reedArray
  return blowRow.length === 7 && drawRow.length === 7
}

export const isReedArray10 = (
  reedArray: ReedArray
): reedArray is ReedArray10 => {
  const [blowRow, drawRow] = reedArray
  return blowRow.length === 10 && drawRow.length === 10
}
