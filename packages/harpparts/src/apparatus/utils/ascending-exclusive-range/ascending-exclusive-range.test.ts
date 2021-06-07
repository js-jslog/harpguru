import { ascendingExclusiveRange } from './ascending-exclusive-range'

test('ascendingExclusiveRange can return a simple 1 integar range', () => {
  expect(ascendingExclusiveRange(0, 2)).toStrictEqual([1])
})

test('ascendingExclusiveRange can return a simple 1 integar range not starting at 0', () => {
  expect(ascendingExclusiveRange(1, 3)).toStrictEqual([2])
})
