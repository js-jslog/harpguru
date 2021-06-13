import type { Hole } from '../../types'

import { isHoleValid } from './is-hole-valid'

test('isHoleValid returns false when bends and overdraws are available', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [1],
    blowbends: [],
    overblows: [],
    overdraws: [1],
  }
  expect(isHoleValid(hole)).toBeFalsy()
})
