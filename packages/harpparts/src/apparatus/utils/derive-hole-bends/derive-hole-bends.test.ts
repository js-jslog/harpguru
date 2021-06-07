import type { Hole } from '../../types'

import { deriveHoleBends } from './derive-hole-bends'

test('deriveHoleBends adds a simple single bend', () => {
  const holeInput: Hole = {
    blow: 0,
    draw: 2,
  }
  const expectedHoleOutput: Hole = {
    blow: 0,
    draw: 2,
    bends: [1],
  }

  const actualHoleOutput = deriveHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})
