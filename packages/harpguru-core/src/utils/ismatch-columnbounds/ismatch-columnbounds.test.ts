import { isMatchColumnBounds } from './ismatch-columnbounds'

test('two identical columnBounds match', () => {
  const columnBounds1 = 'FIT' as const
  const columnBounds2 = [1, 5] as const
  expect(isMatchColumnBounds(columnBounds1, columnBounds1)).toBeTruthy()
  expect(isMatchColumnBounds(columnBounds2, columnBounds2)).toBeTruthy()
})

test('two similar columnBounds match', () => {
  const fit1 = 'FIT' as const
  const fit2 = 'FIT' as const
  const array1 = [1, 5] as const
  const array2 = [1, 5] as const
  expect(isMatchColumnBounds(fit1, fit2)).toBeTruthy()
  expect(isMatchColumnBounds(fit2, fit1)).toBeTruthy()
  expect(isMatchColumnBounds(array1, array2)).toBeTruthy()
  expect(isMatchColumnBounds(array2, array1)).toBeTruthy()
})

test('two dissimilar columnBounds do not match', () => {
  const fit = 'FIT' as const
  const array1 = [1, 3] as const
  const array2 = [1, 5] as const
  expect(isMatchColumnBounds(fit, array1)).toBeFalsy()
  expect(isMatchColumnBounds(array1, fit)).toBeFalsy()
  expect(isMatchColumnBounds(array1, array2)).toBeFalsy()
  expect(isMatchColumnBounds(array2, array1)).toBeFalsy()
})
