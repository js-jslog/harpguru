import { PozitionIds } from '../../Pozition'
import { PitchIds } from '../../Pitch'
import { DegreeIds } from '../../Degree'

import { getAscendingEnumValues, getDescendingEnumValues } from './index'

test('Generic function returns the values from the PozitionIds enum defaulting to First', () => {
  const {
    First,
    Second,
    Third,
    Fourth,
    Fifth,
    Sixth,
    Seventh,
    Eighth,
    Ninth,
    Tenth,
    Eleventh,
    Twelfth,
  } = PozitionIds
  const expectedArray = [
    First,
    Second,
    Third,
    Fourth,
    Fifth,
    Sixth,
    Seventh,
    Eighth,
    Ninth,
    Tenth,
    Eleventh,
    Twelfth,
  ]
  expect(getAscendingEnumValues(PozitionIds)).toStrictEqual(expectedArray)
})

test('Generic function returns the values from the DegreeIds enum from the parameterised origin', () => {
  const {
    Root,
    Flat2,
    Second,
    Flat3,
    Third,
    Fourth,
    Flat5,
    Fifth,
    Flat6,
    Sixth,
    Flat7,
    Seventh,
  } = DegreeIds
  const expectedArray = [
    Flat5,
    Fifth,
    Flat6,
    Sixth,
    Flat7,
    Seventh,
    Root,
    Flat2,
    Second,
    Flat3,
    Third,
    Fourth,
  ]
  expect(getAscendingEnumValues(DegreeIds, Flat5)).toStrictEqual(expectedArray)
})

test('Generic function returns the descending DegreeIds enum from the parameterised origin', () => {
  const { C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B } = PitchIds
  const expectedArray = [A, Ab, G, Gb, F, E, Eb, D, Db, C, B, Bb]
  expect(getDescendingEnumValues(PitchIds)).toStrictEqual(expectedArray)
})
