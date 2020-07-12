import { render } from '@testing-library/react-native'

import { getHoleNumbers } from './index'

test('getHoleNumbers returns an array of HoleNumber components which is the width of the range supplied', () => {
  const props = {
    xRange: [0, 1, 2, 3, 4, 5, 6, 7],
  }
  const holeNumbers = getHoleNumbers(props)

  expect(holeNumbers.length).toBe(8)
})

test('getHoleNumbers returns an array of HoleNumber components from which a sample have the expected value', () => {
  const props = {
    xRange: [1, 2, 3, 4],
  }
  const holeNumbers = getHoleNumbers(props)

  const { getByText: getByText_2 } = render(holeNumbers[0])
  const { getByText: getByText_4 } = render(holeNumbers[2])
  expect(getByText_2('2')).toBeTruthy()
  expect(getByText_4('4')).toBeTruthy()
})
