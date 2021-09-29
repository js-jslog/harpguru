import { PitchIds } from 'harpparts'

import { comparePitchIds } from './compare-pitchids'

test('identical pozition ids are matched', () => {
  const { A: id1 } = PitchIds
  const { B: id2 } = PitchIds
  const { C: id3 } = PitchIds

  expect(comparePitchIds(id1, id1)).toBeTruthy()
  expect(comparePitchIds(id2, id2)).toBeTruthy()
  expect(comparePitchIds(id3, id3)).toBeTruthy()
})

test('similar pozition ids are matched', () => {
  const { A: id1 } = PitchIds
  const { A: id2 } = PitchIds
  const id3 = id1

  expect(comparePitchIds(id1, id2)).toBeTruthy()
  expect(comparePitchIds(id2, id1)).toBeTruthy()
  expect(comparePitchIds(id2, id3)).toBeTruthy()
  expect(comparePitchIds(id3, id2)).toBeTruthy()
  expect(comparePitchIds(id1, id3)).toBeTruthy()
  expect(comparePitchIds(id3, id1)).toBeTruthy()
})

test('dissimilar pozition ids are not matched', () => {
  const { A: id1 } = PitchIds
  const { B: id2 } = PitchIds
  const { C: id3 } = PitchIds

  expect(comparePitchIds(id1, id2)).toBeFalsy()
  expect(comparePitchIds(id2, id1)).toBeFalsy()
  expect(comparePitchIds(id2, id3)).toBeFalsy()
  expect(comparePitchIds(id3, id2)).toBeFalsy()
  expect(comparePitchIds(id1, id3)).toBeFalsy()
  expect(comparePitchIds(id3, id1)).toBeFalsy()
})
