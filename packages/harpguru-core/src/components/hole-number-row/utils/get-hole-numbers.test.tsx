import { render } from '@testing-library/react-native'

import { mockStoreImplementation } from '../../../test-resources'
import { useHarpGuruStore } from '../../../store'

import { getHoleNumbers } from './get-hole-numbers'

jest.mock('../../../store', () => ({ useHarpGuruStore: jest.fn() }))
const mockUseHarpGuruStore = useHarpGuruStore as jest.Mock
mockUseHarpGuruStore.mockImplementation(mockStoreImplementation({}))

test('getHoleNumbers returns an array of HoleNumber components which is the width of the range supplied', () => {
  const xRange = [0, 1, 2, 3, 4, 5, 6, 7]
  const holeNumbers = getHoleNumbers(xRange)

  expect(holeNumbers.length).toBe(8)
})

test('getHoleNumbers returns an array of HoleNumber components from which a sample have the expected value', () => {
  const xRange = [1, 2, 3, 4]
  const holeNumbers = getHoleNumbers(xRange)

  const { getByText: getByText_2 } = render(holeNumbers[0])
  const { getByText: getByText_4 } = render(holeNumbers[2])
  expect(getByText_2('2')).toBeTruthy()
  expect(getByText_4('4')).toBeTruthy()
})
