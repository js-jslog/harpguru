import type { Hole } from '../../types'

import { filterOverbendsMapCallback } from './filter-overbends-map-callback'

test('filterOverbendsMapCallback returns a single hole unmodified', () => {
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

  const output = filterOverbendsMapCallback(input[0], 0, input)

  expect(output).toStrictEqual(input[0])
})

test('filterOverbendsMapCallback returns a filtered out overbend if the hole to the right has an easier version', () => {
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

  const actualOutput = filterOverbendsMapCallback(input[0], 0, input)

  expect(actualOutput).toStrictEqual(expectedOutput)
})
