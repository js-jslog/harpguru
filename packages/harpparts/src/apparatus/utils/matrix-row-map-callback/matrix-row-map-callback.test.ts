import type { Hole, MatrixSpecs } from '../../types'

import { matrixRowMapCallback } from './matrix-row-map-callback'

test('matrixRowMapCallback can map a holes blow and draw tiers with no bends', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 2,
    blowRow: 0,
  }

  expect(matrixRowMapCallback(matrixSpecs, 0, hole)).toBe(hole.blow)
  expect(matrixRowMapCallback(matrixSpecs, 1, hole)).toBe(hole.draw)
})
