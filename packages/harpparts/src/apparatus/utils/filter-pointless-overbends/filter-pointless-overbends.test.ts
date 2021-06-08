import type { Hole } from '../../types'

import { filterPointlessOverbends } from './filter-pointless-overbends'

test('filterPointlessOverbends returns a single hole unmodified', () => {
  const input: [Hole] = [
    {
      blow: 9,
      draw: 10,
    },
  ]

  const output = filterPointlessOverbends(input[0], 0, input)

  expect(output).toEqual(input[0])
})

test('filterPointlessOverbends returns a filtered out overbend if the hole to the right has an easier version', () => {
  const input: Hole[] = [
    {
      blow: 9,
      draw: 10,
      overblow: [11],
    },
    {
      blow: 11,
      draw: 12,
      overblow: [13],
    },
  ]

  const expectedOutput = {
    blow: 9,
    draw: 10,
    overblow: [],
  }

  const actualOutput = filterPointlessOverbends(input[0], 0, input)

  expect(actualOutput).toEqual(expectedOutput)
})
