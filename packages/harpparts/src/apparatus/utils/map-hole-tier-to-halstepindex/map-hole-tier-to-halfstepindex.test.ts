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

  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 0)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 1)).toBe(hole.draw)
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

  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 0)).toBe(
    hole.overblows[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 1)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 2)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 3)).toBe(hole.bends[0])
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

  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 0)).toBe(
    hole.blowbends[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 1)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 2)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 3)).toBe(
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

  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 0)).toBe(
    hole.overblows[1]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 1)).toBe(
    hole.overblows[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 2)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 3)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 4)).toBe(hole.bends[1])
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 5)).toBe(hole.bends[0])
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

  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 0)).toBe(
    hole.blowbends[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 1)).toBe(
    hole.blowbends[1]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 2)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 3)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 4)).toBe(
    hole.overdraws[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 5)).toBe(
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

  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 0)).toBeFalsy()
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 1)).toBe(
    hole.overblows[1]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 2)).toBe(
    hole.overblows[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 3)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 4)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 5)).toBe(hole.bends[1])
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 6)).toBe(hole.bends[0])
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 7)).toBeFalsy()
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

  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 0)).toBeFalsy()
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 1)).toBe(
    hole.blowbends[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 2)).toBe(
    hole.blowbends[1]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 3)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 4)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 5)).toBe(
    hole.overdraws[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 6)).toBe(
    hole.overdraws[1]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, hole, 7)).toBeFalsy()
})
