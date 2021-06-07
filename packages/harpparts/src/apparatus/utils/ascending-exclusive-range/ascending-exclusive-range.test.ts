import { ascendingExclusiveRange } from './ascending-exclusive-range'

test('ascendingExclusiveRange can return a simple 1 integar range', () => {
  expect(ascendingExclusiveRange(0, 2)).toStrictEqual([1])
  expect(ascendingExclusiveRange(1, 3)).toStrictEqual([2])
})

test('ascendingExclusiveRange can return an empty array when there is no range', () => {
  expect(ascendingExclusiveRange(1, 2)).toStrictEqual([])
  expect(ascendingExclusiveRange(1, 1)).toStrictEqual([])
})

test('ascendingExclusiveRange can return a multi integar range', () => {
  expect(ascendingExclusiveRange(1, 10)).toStrictEqual([2, 3, 4, 5, 6, 7, 8, 9])
  expect(ascendingExclusiveRange(8, 21)).toStrictEqual([
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ])
})
