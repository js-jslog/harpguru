import { reverseFromOrigin } from './index'

test('reverses an array of numbers keeping the zeroth value the same', () => {
  const arrayIn = [ 1, 2, 3, 4, 5 ]

  const expectedArrayOut = [ 1, 5, 4, 3, 2 ]
  const actualArrayOut = reverseFromOrigin(arrayIn)
  expect(actualArrayOut).toStrictEqual(expectedArrayOut)
})

test('reverses an array of strings keeping the zeroth value the same', () => {
  const arrayIn = [ '1', '2', '3', '4', '5' ]

  const expectedArrayOut = [ '1', '5', '4', '3', '2' ]
  const actualArrayOut = reverseFromOrigin(arrayIn)
  expect(actualArrayOut).toStrictEqual(expectedArrayOut)
})
