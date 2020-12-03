import { DegreeIds } from 'harpparts'

import { doScalesMatch } from './do-scales-match'

const { Root, Second, Third } = DegreeIds

test('empty scales are considered a match', () => {
  expect(doScalesMatch([], [])).toBeTruthy()
})

test('simple scale matches', () => {
  expect(doScalesMatch([Root], [Root])).toBeTruthy()
  expect(doScalesMatch([Second], [Second])).toBeTruthy()
  expect(doScalesMatch([Third], [Third])).toBeTruthy()
})

test('complex matching scales are considered a match', () => {
  expect(doScalesMatch([Root, Second, Third], [Root, Second, Third]))
  expect(doScalesMatch([Root, Second, Third], [Third, Second, Root]))
})

test('complex unmatching scales are not considered a match', () => {
  expect(doScalesMatch([Root, Second, Third], [Third, Root]))
  expect(doScalesMatch([Root, Third], [Third, Second, Root]))
})
