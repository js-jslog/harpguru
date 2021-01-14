import { getInputRange } from './get-input-range'

test('that an input range of 1 can be produced', () => {
  expect(getInputRange(1)).toStrictEqual([0])
})

test('that an input range of 2 can be produced', () => {
  expect(getInputRange(2)).toStrictEqual([0, 1])
})

test('that an input range of 3 can be produced', () => {
  expect(getInputRange(3)).toStrictEqual([0, 1, 2])
})

test('that an input range of 4 can be produced', () => {
  expect(getInputRange(4)).toStrictEqual([0, 1, 2, 3])
})
