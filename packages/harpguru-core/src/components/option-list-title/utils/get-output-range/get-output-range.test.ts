import { getOutputRange } from './get-output-range'

test('that an error is thrown if an index outside the appropriate range is given', () => {
  expect(() => getOutputRange(1, 1)).toThrow('Index outside of range given')
})

test('that output ranges for a range of 1 can be produced', () => {
  expect(getOutputRange(0, 1)).toStrictEqual([1])
})

test('that output ranges for a range of 2 can be produced', () => {
  expect(getOutputRange(0, 2)).toStrictEqual([1, 0])
  expect(getOutputRange(1, 2)).toStrictEqual([0, 1])
})

test('that output ranges for a range of 3 can be produced', () => {
  expect(getOutputRange(0, 3)).toStrictEqual([1, 0, 0])
  expect(getOutputRange(1, 3)).toStrictEqual([0, 1, 0])
  expect(getOutputRange(2, 3)).toStrictEqual([0, 0, 1])
})

test('that output ranges for a range of 4 can be produced', () => {
  expect(getOutputRange(0, 4)).toStrictEqual([1, 0, 0, 0])
  expect(getOutputRange(1, 4)).toStrictEqual([0, 1, 0, 0])
  expect(getOutputRange(2, 4)).toStrictEqual([0, 0, 1, 0])
  expect(getOutputRange(3, 4)).toStrictEqual([0, 0, 0, 1])
})
