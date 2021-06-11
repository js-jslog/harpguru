import type { Hole, MatrixSpecs } from '../../types'

import { mapHoleTierToHalfstepindex } from './map-hole-tier-to-halfstepindex'

test('mapHoleTierToHalfstepindex can map a holes blow and draw tiers with no bends', () => {
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

  expect(mapHoleTierToHalfstepindex(matrixSpecs, 0, hole)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 1, hole)).toBe(hole.draw)
})

test('mapHoleTierToHalfstepindex can map a holes blow, draw and bend tiers with single level bends present (lower harp)', () => {
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

  expect(mapHoleTierToHalfstepindex(matrixSpecs, 0, hole)).toBe(
    hole.overblows[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 1, hole)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 2, hole)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 3, hole)).toBe(hole.bends[0])
})

test('mapHoleTierToHalfstepindex can map a holes blow, draw and bend tiers with single level bends present (upper harp)', () => {
  const hole: Hole = {
    blow: 2,
    draw: 0,
    bends: [],
    blowbends: [1],
    overblows: [],
    overdraws: [3],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 4,
    blowRow: 1,
  }

  expect(mapHoleTierToHalfstepindex(matrixSpecs, 0, hole)).toBe(
    hole.blowbends[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 1, hole)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 2, hole)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 3, hole)).toBe(
    hole.overdraws[0]
  )
})

test('mapHoleTierToHalfstepindex can map a holes blow, draw and bend tiers with multi level bends present (lower harp)', () => {
  const hole: Hole = {
    blow: 0,
    draw: 3,
    bends: [1, 2],
    blowbends: [],
    overblows: [4, 5],
    overdraws: [],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 6,
    blowRow: 2,
  }

  expect(mapHoleTierToHalfstepindex(matrixSpecs, 0, hole)).toBe(
    hole.overblows[1]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 1, hole)).toBe(
    hole.overblows[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 2, hole)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 3, hole)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 4, hole)).toBe(hole.bends[1])
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 5, hole)).toBe(hole.bends[0])
})

test('mapHoleTierToHalfstepindex can map a holes blow, draw and bend tiers with multi level bends present (upper harp)', () => {
  const hole: Hole = {
    blow: 3,
    draw: 0,
    bends: [],
    blowbends: [1, 2],
    overblows: [],
    overdraws: [4, 5],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 6,
    blowRow: 2,
  }

  expect(mapHoleTierToHalfstepindex(matrixSpecs, 0, hole)).toBe(
    hole.blowbends[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 1, hole)).toBe(
    hole.blowbends[1]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 2, hole)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 3, hole)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 4, hole)).toBe(
    hole.overdraws[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 5, hole)).toBe(
    hole.overdraws[1]
  )
})

test('mapHoleTierToHalfstepindex can map a holes blow, draw, and undefined bend tiers with multi level bends present (lower harp)', () => {
  const hole: Hole = {
    blow: 0,
    draw: 3,
    bends: [1, 2],
    blowbends: [],
    overblows: [4, 5],
    overdraws: [],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 8,
    blowRow: 3,
  }

  expect(mapHoleTierToHalfstepindex(matrixSpecs, 0, hole)).toBeFalsy()
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 1, hole)).toBe(
    hole.overblows[1]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 2, hole)).toBe(
    hole.overblows[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 3, hole)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 4, hole)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 5, hole)).toBe(hole.bends[1])
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 6, hole)).toBe(hole.bends[0])
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 7, hole)).toBeFalsy()
})

test('mapHoleTierToHalfstepindex can map a holes blow, draw and bend tiers with multi level bends present (upper harp)', () => {
  const hole: Hole = {
    blow: 3,
    draw: 0,
    bends: [],
    blowbends: [1, 2],
    overblows: [],
    overdraws: [4, 5],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 8,
    blowRow: 3,
  }

  expect(mapHoleTierToHalfstepindex(matrixSpecs, 0, hole)).toBeFalsy()
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 1, hole)).toBe(
    hole.blowbends[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 2, hole)).toBe(
    hole.blowbends[1]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 3, hole)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 4, hole)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 5, hole)).toBe(
    hole.overdraws[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 6, hole)).toBe(
    hole.overdraws[1]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 7, hole)).toBeFalsy()
})
