import { isPopulatedArray } from './is-populated-array'

// TODO: move this in to the `getViewableMatrix` util
// folder and remove all other references when ready
// This was copied from the root utils which seemed to
// be limited to the harpstrata reducers made there.
// Perhaps it's scope can be kept very limited.
test('Arrays containing any content return true', () => {
  const array1 = [1]
  const array2 = [1, undefined, undefined, undefined]
  const array3 = [undefined, 'A', undefined, undefined, undefined]

  expect(isPopulatedArray(array1)).toBeTruthy()
  expect(isPopulatedArray(array2)).toBeTruthy()
  expect(isPopulatedArray(array3)).toBeTruthy()
})

test('Arrays not containing any content return false', () => {
  const array1 = [undefined]
  const array2 = [undefined, undefined, undefined]
  const array3 = [undefined, undefined, undefined, undefined]
  const array4 = [] as ReadonlyArray<unknown>

  expect(isPopulatedArray(array1)).toBeFalsy()
  expect(isPopulatedArray(array2)).toBeFalsy()
  expect(isPopulatedArray(array3)).toBeFalsy()
  expect(isPopulatedArray(array4)).toBeFalsy()
})
