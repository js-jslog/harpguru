import { getPitch, PitchIds, getDegree, DegreeIds } from 'harpparts'

import { doSlotsMatch } from './do-slots-match'

test('mismatched pitches return false', () => {
  const pitch1 = getPitch(PitchIds.Ab)
  const pitch2 = getPitch(PitchIds.A)

  expect(doSlotsMatch(pitch1, pitch2)).toBeFalsy()
})

test('matched pitches return true', () => {
  const pitch1 = getPitch(PitchIds.A)
  const pitch2 = getPitch(PitchIds.A)

  expect(doSlotsMatch(pitch1, pitch2)).toBeTruthy()
})

test('mismatched degrees return false', () => {
  const degree1 = getDegree(DegreeIds.Third)
  const degree2 = getDegree(DegreeIds.Flat3)

  expect(doSlotsMatch(degree1, degree2)).toBeFalsy()
})

test('matched degrees return true', () => {
  const degree1 = getDegree(DegreeIds.Root)
  const degree2 = getDegree(DegreeIds.Root)

  expect(doSlotsMatch(degree1, degree2)).toBeTruthy()
})

test('two undefineds return true', () => {
  expect(doSlotsMatch(undefined, undefined)).toBeTruthy()
})

test('if only one of the params is undefined, returns false', () => {
  const degree = getDegree(DegreeIds.Root)
  expect(doSlotsMatch(undefined, degree)).toBeFalsy()
  expect(doSlotsMatch(degree, undefined)).toBeFalsy()
})
