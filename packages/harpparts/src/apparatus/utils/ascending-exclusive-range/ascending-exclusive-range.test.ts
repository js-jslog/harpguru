import { ascendingExclusiveRange } from './ascending-exclusive-range'

test('ascendingExclusiveRange can return a simple 1 integar range', () => {
  expect(ascendingExclusiveRange(0, 2)).toStrictEqual([1])
  expect(ascendingExclusiveRange(2, 0)).toStrictEqual([1])
  expect(ascendingExclusiveRange(1, 3)).toStrictEqual([2])
  expect(ascendingExclusiveRange(3, 1)).toStrictEqual([2])
  expect(ascendingExclusiveRange(123, 125)).toStrictEqual([124])
  expect(ascendingExclusiveRange(125, 123)).toStrictEqual([124])
  expect(ascendingExclusiveRange(-123, -125)).toStrictEqual([-124])
  expect(ascendingExclusiveRange(-125, -123)).toStrictEqual([-124])
})

test('ascendingExclusiveRange can return an empty array when there is no range', () => {
  expect(ascendingExclusiveRange(1, 2)).toStrictEqual([])
  expect(ascendingExclusiveRange(2, 1)).toStrictEqual([])
  expect(ascendingExclusiveRange(-1, -2)).toStrictEqual([])
  expect(ascendingExclusiveRange(-2, -1)).toStrictEqual([])
  expect(ascendingExclusiveRange(1, 1)).toStrictEqual([])
  expect(ascendingExclusiveRange(-1, -1)).toStrictEqual([])
  expect(ascendingExclusiveRange(999, 999)).toStrictEqual([])
  expect(ascendingExclusiveRange(-999, -999)).toStrictEqual([])
})

test('ascendingExclusiveRange can return a multi integar range', () => {
  expect(ascendingExclusiveRange(1, 10)).toStrictEqual([2, 3, 4, 5, 6, 7, 8, 9])
  expect(ascendingExclusiveRange(10, 1)).toStrictEqual([2, 3, 4, 5, 6, 7, 8, 9])
  expect(ascendingExclusiveRange(1, -3)).toStrictEqual([-2, -1, 0])
  expect(ascendingExclusiveRange(-3, 1)).toStrictEqual([-2, -1, 0])
  expect(ascendingExclusiveRange(3, -3)).toStrictEqual([-2, -1, 0, 1, 2])
  expect(ascendingExclusiveRange(-3, 3)).toStrictEqual([-2, -1, 0, 1, 2])
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
  expect(ascendingExclusiveRange(21, 8)).toStrictEqual([
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
