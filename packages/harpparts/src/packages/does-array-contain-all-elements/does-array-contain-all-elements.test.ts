import { DegreeIds } from '../../degree'

import { doesArrayContainAllElements } from './does-array-contain-all-elements'

const { Root, Second, Third } = DegreeIds

test('empty comparitor always returns true', () => {
  expect(doesArrayContainAllElements([], [])).toBeTruthy()
  expect(doesArrayContainAllElements([Root], [])).toBeTruthy()
  expect(doesArrayContainAllElements([Second, Third], [])).toBeTruthy()
  expect(doesArrayContainAllElements(['Second', 'Third'], [])).toBeTruthy()
})

test('simple comparitor matches', () => {
  expect(doesArrayContainAllElements([Root], [Root])).toBeTruthy()
  expect(doesArrayContainAllElements([Root, Second], [Second])).toBeTruthy()
  expect(doesArrayContainAllElements([1, 2], [2])).toBeTruthy()
})

test('complex comparitor matches', () => {
  expect(
    doesArrayContainAllElements([Root, Second, Third], [Root, Second, Third])
  )
  expect(
    doesArrayContainAllElements([Root, Second, Third], [Third, Second, Root])
  )
  expect(doesArrayContainAllElements([Root, Second, Third], [Second, Root]))
  expect(doesArrayContainAllElements([1, 2, 3], [2, 1]))
})

test('complex unmatching comparitors dont match', () => {
  expect(doesArrayContainAllElements([Root, Second], [Third, Root]))
  expect(doesArrayContainAllElements([Root, Third], [Third, Second, Root]))
  expect(doesArrayContainAllElements([1, 3], [3, 2, 1]))
})
