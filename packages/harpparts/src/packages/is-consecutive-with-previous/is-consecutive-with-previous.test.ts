import {
  isConsecutiveWithPrevious,
  Direction,
} from './is-consecutive-with-previous'

const { Ascending, Descending } = Direction

test('isConsecutiveWithPrevious returns true for the first element in an array', () => {
  expect(isConsecutiveWithPrevious(Ascending, 0, 0, [0, 1, 2])).toBeTruthy()
  expect(isConsecutiveWithPrevious(Descending, 0, 0, [0, 1, 2])).toBeTruthy()
  expect(isConsecutiveWithPrevious(Ascending, 1, 0, [1, 1, 1])).toBeTruthy()
  expect(isConsecutiveWithPrevious(Ascending, 1, 0, [1, 3, 5])).toBeTruthy()
  expect(isConsecutiveWithPrevious(Descending, 1, 0, [1, 1, 1])).toBeTruthy()
  expect(isConsecutiveWithPrevious(Descending, 1, 0, [1, 3, 5])).toBeTruthy()
})

test('isConsecutiveWithPrevious returns true for ascending consecutive element', () => {
  expect(isConsecutiveWithPrevious(Ascending, 1, 1, [0, 1, 2])).toBeTruthy()
  expect(isConsecutiveWithPrevious(Ascending, 2, 2, [0, 1, 2])).toBeTruthy()
})

test('isConsecutiveWithPrevious returns false for ascending consecutive element in call for descending array', () => {
  expect(isConsecutiveWithPrevious(Descending, 1, 1, [0, 1, 2])).toBeFalsy()
  expect(isConsecutiveWithPrevious(Descending, 2, 2, [0, 1, 2])).toBeFalsy()
})

test('isConsecutiveWithPrevious returns true for descending consecutive element', () => {
  expect(isConsecutiveWithPrevious(Descending, 1, 1, [2, 1, 0])).toBeTruthy()
  expect(isConsecutiveWithPrevious(Descending, 0, 2, [2, 1, 0])).toBeTruthy()
})

test('isConsecutiveWithPrevious returns false for descending consecutive element in call for ascending array', () => {
  expect(isConsecutiveWithPrevious(Ascending, 1, 1, [2, 1, 0])).toBeFalsy()
  expect(isConsecutiveWithPrevious(Ascending, 0, 2, [2, 1, 0])).toBeFalsy()
})

test('isConsecutiveWithPrevious returns false for non-consecutive elements in array', () => {
  expect(isConsecutiveWithPrevious(Ascending, 1, 1, [1, 1, 1])).toBeFalsy()
  expect(isConsecutiveWithPrevious(Ascending, 1, 3, [1, 3, 5])).toBeFalsy()
  expect(isConsecutiveWithPrevious(Descending, 1, 1, [1, 1, 1])).toBeFalsy()
  expect(isConsecutiveWithPrevious(Descending, 1, 3, [1, 3, 5])).toBeFalsy()
})
