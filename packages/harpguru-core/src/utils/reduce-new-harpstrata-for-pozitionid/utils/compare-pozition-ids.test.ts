import { PozitionIds } from 'harpparts'

import { comparePozitionIds } from './compare-pozition-ids'

test('identical pozition ids are matched', () => {
  const { First: id1 } = PozitionIds
  const { Second: id2 } = PozitionIds
  const { Third: id3 } = PozitionIds

  expect(comparePozitionIds(id1, id1)).toBeTruthy()
  expect(comparePozitionIds(id2, id2)).toBeTruthy()
  expect(comparePozitionIds(id3, id3)).toBeTruthy()
})
