import type { Hole, MatrixSpecs } from '../../types'

import { mapHoleTierToHalfstepindex } from './map-hole-tier-to-halfstepindex'

test('mapHoleTierToHalfstepindex can map a holes blow and draw tiers with no bends', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
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
    blowbends: [],
    drawbends: [1],
    overblows: [3],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
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
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 3, hole)).toBe(
    hole.drawbends[0]
  )
})

test('mapHoleTierToHalfstepindex can map a holes blow, draw and bend tiers with single level bends present (upper harp)', () => {
  const hole: Hole = {
    blow: 2,
    draw: 0,
    blowbends: [1],
    drawbends: [],
    overblows: [],
    overdraws: [3],
    valvedblows: [],
    valveddraws: [],
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
    blowbends: [],
    drawbends: [1, 2],
    overblows: [4, 5],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
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
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 4, hole)).toBe(
    hole.drawbends[1]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 5, hole)).toBe(
    hole.drawbends[0]
  )
})

test('mapHoleTierToHalfstepindex can map a holes blow, draw and bend tiers with multi level bends present (upper harp)', () => {
  const hole: Hole = {
    blow: 3,
    draw: 0,
    blowbends: [1, 2],
    drawbends: [],
    overblows: [],
    overdraws: [4, 5],
    valvedblows: [],
    valveddraws: [],
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
    blowbends: [],
    drawbends: [1, 2],
    overblows: [4, 5],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
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
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 5, hole)).toBe(
    hole.drawbends[1]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 6, hole)).toBe(
    hole.drawbends[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 7, hole)).toBeFalsy()
})

test('mapHoleTierToHalfstepindex can map a holes blow, draw and bend tiers with multi level bends present (upper harp)', () => {
  const hole: Hole = {
    blow: 3,
    draw: 0,
    blowbends: [1, 2],
    drawbends: [],
    overblows: [],
    overdraws: [4, 5],
    valvedblows: [],
    valveddraws: [],
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

test('mapHoleTierToHalfstepindex can map a holes blow, draw and valvedblows tiers with single level bends present (lower harp)', () => {
  const hole: Hole = {
    blow: 0,
    draw: 2,
    blowbends: [],
    drawbends: [1],
    overblows: [],
    overdraws: [],
    valvedblows: [-1],
    valveddraws: [],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 4,
    blowRow: 1,
  }

  expect(mapHoleTierToHalfstepindex(matrixSpecs, 0, hole)).toBe(
    hole.valvedblows[0]
  )
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 1, hole)).toBe(hole.blow)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 2, hole)).toBe(hole.draw)
  expect(mapHoleTierToHalfstepindex(matrixSpecs, 3, hole)).toBe(
    hole.drawbends[0]
  )
})

test('mapHoleTierToHalfstepindex can map a holes blow, draw and valveddraws tiers with single level bends present (upper harp)', () => {
  const hole: Hole = {
    blow: 15,
    draw: 13,
    blowbends: [14],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [12],
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
    hole.valveddraws[0]
  )
})
