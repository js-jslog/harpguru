import { reversePreserveOrigin } from './reverse-preserve-origin'

test('Array is reversed while preserving origin', () => {
  const arrayIn = [1, 2, 3, 4, 5]
  const expectedArrayOut = [1, 5, 4, 3, 2]
  const actualArrayOut = reversePreserveOrigin(arrayIn)
  expect(actualArrayOut).toStrictEqual(expectedArrayOut)
})

test('Array is reversed while preserving origin with various types', () => {
  const arrayIn = ['11', [2, 2], 3, '466', 52]
  const expectedArrayOut = ['11', 52, '466', 3, [2, 2]]
  const actualArrayOut = reversePreserveOrigin(arrayIn)
  expect(actualArrayOut).toStrictEqual(expectedArrayOut)
})
