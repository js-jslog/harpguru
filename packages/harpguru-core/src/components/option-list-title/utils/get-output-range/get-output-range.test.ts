import { getOutputRange } from './get-output-range'

test('that output ranges for a range of 2 can be produced', () => {
  expect(getOutputRange(0, 2)).toStrictEqual([1, 0])
  expect(getOutputRange(1, 2)).toStrictEqual([0, 1])
})
