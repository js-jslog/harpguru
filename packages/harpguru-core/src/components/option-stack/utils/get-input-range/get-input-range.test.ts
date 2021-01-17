import { getInputRange } from './get-input-range'

test('that an error is thrown if an range is below 1', () => {
  expect(() => getInputRange(0)).toThrow(
    'Only range lengths greater than 0 are valid'
  )
  expect(() => getInputRange(-1)).toThrow(
    'Only range lengths greater than 0 are valid'
  )
  expect(() => getInputRange(-999)).toThrow(
    'Only range lengths greater than 0 are valid'
  )
})

test('that an input range of 1 can be produced (see comment in code for explanation of strange expectation here)', () => {
  expect(getInputRange(1)).toStrictEqual([1, 1])
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
