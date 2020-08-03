import { getFragmentFacts } from './index'

test('Recovers the column count from the fragment props', () => {
  const xRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const fragmentFacts = getFragmentFacts(xRange)

  const { columnCount } = fragmentFacts

  expect(columnCount).toBe(10)
})

test('Recovers the column count from a smaller fragment props', () => {
  const xRange = [4, 5, 6, 7]
  const fragmentFacts = getFragmentFacts(xRange)

  const { columnCount } = fragmentFacts

  expect(columnCount).toBe(4)
})
