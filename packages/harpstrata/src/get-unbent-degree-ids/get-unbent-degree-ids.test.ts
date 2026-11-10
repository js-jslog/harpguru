import { DegreeIds, PozitionIds, TuningIds } from 'harpparts'

import { getUnbentDegreeIds } from './get-unbent-degree-ids'

const { Root, Second, Flat3, Third, Fourth, Fifth, Sixth, Flat7, Seventh } =
  DegreeIds

test('getUnbentDegreeIds returns the blow and draw notes of a major diatonic in 2nd as Mixolydian', () => {
  expect(
    getUnbentDegreeIds(TuningIds.MajorDiatonic, PozitionIds.Second)
  ).toStrictEqual([Root, Second, Third, Fourth, Fifth, Sixth, Flat7])
})

test('getUnbentDegreeIds returns the blow and draw notes of a major diatonic in 1st as Ionian', () => {
  expect(
    getUnbentDegreeIds(TuningIds.MajorDiatonic, PozitionIds.First)
  ).toStrictEqual([Root, Second, Third, Fourth, Fifth, Sixth, Seventh])
})

test('getUnbentDegreeIds reads both faces of a chromatic, slide in and out', () => {
  const degrees = getUnbentDegreeIds(
    TuningIds.TwelveHoleChromatic,
    PozitionIds.First
  )
  expect(degrees).toContain(Flat3)
  expect(degrees).toHaveLength(12)
})
