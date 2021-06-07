import { ascendingExclusiveRange } from './ascending-exclusive-range'

test('ascendingExclusiveRange can return a simple 1 integar range', () => {
  expect(ascendingExclusiveRange(0, 2)).toStrictEqual([1])
})
