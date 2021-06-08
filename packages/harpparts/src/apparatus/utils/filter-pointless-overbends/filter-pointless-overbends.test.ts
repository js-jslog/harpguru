import type { Hole } from '../../types'

import { filterPointlessOverbends } from './filter-pointless-overbends'

test('filterPointlessOverbends returns a single hole unmodified', () => {
  const input: [Hole] = [
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowBends: [],
      overblows: [],
      overdraws: [],
    },
  ]

  const output = filterPointlessOverbends(input[0], 0, input)

  expect(output).toStrictEqual(input[0])
})

test('filterPointlessOverbends returns a filtered out overbend if the hole to the right has an easier version', () => {
  const input: Hole[] = [
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowBends: [],
      overblows: [11],
      overdraws: [],
    },
    {
      blow: 11,
      draw: 12,
      bends: [],
      blowBends: [],
      overblows: [13],
      overdraws: [],
    },
  ]

  const expectedOutput = {
    blow: 9,
    draw: 10,
    bends: [],
    blowBends: [],
    overblows: [],
    overdraws: [],
  }

  const actualOutput = filterPointlessOverbends(input[0], 0, input)

  expect(actualOutput).toStrictEqual(expectedOutput)
})
