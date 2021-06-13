import { isConsecutiveWithPrevious } from './is-consecutive-with-previous'

test('isConsecutiveWithPrevious returns true for the first element in an array', () => {
  expect(isConsecutiveWithPrevious(0, 0, [0, 1, 2])).toBeTruthy()
})

test('isConsecutiveWithPrevious returns true for simple consecutive element', () => {
  expect(isConsecutiveWithPrevious(1, 1, [0, 1, 2])).toBeTruthy()
  expect(isConsecutiveWithPrevious(2, 2, [0, 1, 2])).toBeTruthy()
})
