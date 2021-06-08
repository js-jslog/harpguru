import type { Hole } from '../../types'

import { filterPointlessOverbends } from './filter-pointless-overbends'

test('filterPointlessOverbends returns a single hole unmodified', () => {
  const input: [Hole] = [
    {
      blow: 9,
      draw: 10,
    },
  ]

  const output = filterPointlessOverbends(input)

  expect(output).toStrictEqual(input)
})
