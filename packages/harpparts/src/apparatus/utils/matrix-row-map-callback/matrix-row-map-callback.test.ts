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

test('matrixRowMapCallback can map a holes blow, draw and bend tiers with single level bends present', () => {
  const hole: Hole = {
    blow: 0,
    draw: 2,
    bends: [1],
    blowbends: [],
    overblows: [3],
    overdraws: [],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 4,
    blowRow: 1,
  }

  expect(matrixRowMapCallback(matrixSpecs, 0, hole)).toBe(hole.overblows[0])
  expect(matrixRowMapCallback(matrixSpecs, 1, hole)).toBe(hole.blow)
  expect(matrixRowMapCallback(matrixSpecs, 2, hole)).toBe(hole.draw)
  expect(matrixRowMapCallback(matrixSpecs, 3, hole)).toBe(hole.bends[0])
})
