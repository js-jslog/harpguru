import type {
  ReedArray,
  ReedArray7,
  ReedArray10,
  ReedArray12,
  ReedArray13,
  ReedArray16,
} from './tuning-types'

export const isReedArrayEmpty = (reedArray: ReedArray): reedArray is ReedArray7 => {
  const [blowRow, drawRow] = reedArray
  return blowRow.length === 0 && drawRow.length === 0
}

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

export const isReedArray12 = (
  reedArray: ReedArray
): reedArray is ReedArray12 => {
  const [blowRow, drawRow] = reedArray
  return blowRow.length === 12 && drawRow.length === 12
}

export const isReedArray13 = (
  reedArray: ReedArray
): reedArray is ReedArray13 => {
  const [blowRow, drawRow] = reedArray
  return blowRow.length === 13 && drawRow.length === 13
}

export const isReedArray16 = (
  reedArray: ReedArray
): reedArray is ReedArray16 => {
  const [blowRow, drawRow] = reedArray
  return blowRow.length === 16 && drawRow.length === 16
}
