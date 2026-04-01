import { ReedTuningPitches } from '../types'
import type { ReedArray } from '../types'
import { mapHarpFaceFacts } from '../../utils'
import type { HarpFaceFacts } from '../../types'
import { sliceMatrix } from '../../packages/slice-matrix'

import {
  SOLO_TWELVE_HOLE_CHROMATIC,
  SOLO_SIXTEEN_HOLE_CHROMATIC,
  ORCHESTRA_TWELVE_HOLE_CHROMATIC,
  ORCHESTRA_SIXTEEN_HOLE_CHROMATIC,
} from './index'

// The main purpose of this file is as a documentation of
// the interrelatedness of the solo and orchestra tunings
// I have tried to make the sliceChromaticBase function a
// util which the actual tuning constants can use to populate
// themselves, but as soon as the function is used in that
// way some error which I've been unable to resolve presents
// itself. I think it has something to do with a compilation
// error with `mapHarpFaceFacts`, but there is no sense trying
// to fix it when this workaround will do the job.

const {
  g0,
  ab0,
  a0,
  bb0,
  b0,
  c1,
  db1,
  d1,
  eb1,
  e1,
  f1,
  gb1,
  g1,
  ab1,
  a1,
  bb1,
  b1,
  c2,
  db2,
  d2,
  eb2,
  e2,
  f2,
  gb2,
  g2,
  ab2,
  a2,
  bb2,
  b2,
  db3,
  c3,
  d3,
  eb3,
  e3,
  f3,
  gb3,
  g3,
  ab3,
  a3,
  bb3,
  b3,
  c4,
  db4,
  d4,
  e4,
  eb4,
  f4,
  gb4,
  g4,
  ab4,
  a4,
  bb4,
  b4,
  c5,
  db5,
} = ReedTuningPitches

// prettier-ignore
const chromaticBase = {
  harpface1: [
    // 1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18
    [ g0 , c1 , c1 , e1 , g1 , c2 , c2 , e2 , g2 , c3 , c3 , e3 , g3 , c4 , c4 , e4 , g4 , c5 ] as const,
    [ a0 , b0 , d1 , f1 , a1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 , b3 , d4 , f4 , a4 , b4 ] as const
  ] as const,
  harpface2: [
    // 1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18
    [ ab0, db1, db1, f1 , ab1, db2, db2, f2 , ab2, db3, db3, f3 , ab3, db4, db4, f4 , ab4, db5] as const,
    [ bb0, c1 , eb1, gb1, bb1, c2 , eb2, gb2, bb2, c3 , eb3, gb3, bb3, c4 , eb4, gb4, bb4, c5 ] as const // The last one may also be d5 in some circumstances
  ] as const
} as const

const getSliceMatrixBy = (start: number, end: number) => {
  const sliceMatrixBy = (
    matrix: ReadonlyArray<ReadonlyArray<ReedTuningPitches>>
  ) => {
    return sliceMatrix(matrix, start, end)
  }
  return sliceMatrixBy
}

const sliceChromaticBase = (
  start: number,
  end: number
): HarpFaceFacts<ReedArray> => {
  return mapHarpFaceFacts(
    chromaticBase,
    getSliceMatrixBy(start, end)
  ) as HarpFaceFacts<ReedArray>
}

test('The soloTwelveHoleChromatic tuning is correct', () => {
  expect(SOLO_TWELVE_HOLE_CHROMATIC.reedArrays).toStrictEqual(
    sliceChromaticBase(6, 18)
  )
})

test('The soloSixteenHoleChromatic tuning is correct', () => {
  expect(SOLO_SIXTEEN_HOLE_CHROMATIC.reedArrays).toStrictEqual(
    sliceChromaticBase(2, 18)
  )
})

test('The orchestraTwelveHoleChromatic tuning is correct', () => {
  expect(ORCHESTRA_TWELVE_HOLE_CHROMATIC.reedArrays).toStrictEqual(
    sliceChromaticBase(4, 16)
  )
})

test('The orchestraSixteenHoleChromatic tuning is correct', () => {
  expect(ORCHESTRA_SIXTEEN_HOLE_CHROMATIC.reedArrays).toStrictEqual(
    sliceChromaticBase(0, 16)
  )
})
