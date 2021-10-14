import { PozitionIds } from 'harpparts'

import { isMatchPozitionIds } from './ismatch-pozitionids'

test('identical pozition ids are matched', () => {
  const { First: id1 } = PozitionIds
  const { Second: id2 } = PozitionIds
  const { Third: id3 } = PozitionIds

  expect(isMatchPozitionIds(id1, id1)).toBeTruthy()
  expect(isMatchPozitionIds(id2, id2)).toBeTruthy()
  expect(isMatchPozitionIds(id3, id3)).toBeTruthy()
})

test('similar pozition ids are matched', () => {
  const { First: id1 } = PozitionIds
  const { First: id2 } = PozitionIds
  const id3 = id1

  expect(isMatchPozitionIds(id1, id2)).toBeTruthy()
  expect(isMatchPozitionIds(id2, id1)).toBeTruthy()
  expect(isMatchPozitionIds(id2, id3)).toBeTruthy()
  expect(isMatchPozitionIds(id3, id2)).toBeTruthy()
  expect(isMatchPozitionIds(id1, id3)).toBeTruthy()
  expect(isMatchPozitionIds(id3, id1)).toBeTruthy()
})

test('dissimilar pozition ids are not matched', () => {
  const { First: id1 } = PozitionIds
  const { Second: id2 } = PozitionIds
  const { Third: id3 } = PozitionIds

  expect(isMatchPozitionIds(id1, id2)).toBeFalsy()
  expect(isMatchPozitionIds(id2, id1)).toBeFalsy()
  expect(isMatchPozitionIds(id2, id3)).toBeFalsy()
  expect(isMatchPozitionIds(id3, id2)).toBeFalsy()
  expect(isMatchPozitionIds(id1, id3)).toBeFalsy()
  expect(isMatchPozitionIds(id3, id1)).toBeFalsy()
})
