import type { Hole, MatrixSpecs } from '../../types'
import {
  BLOW,
  DRAW,
  BEND1,
  BEND2,
  BEND3,
  BEND4,
  BEND5,
  BLOWBEND1,
  BLOWBEND2,
  BLOWBEND3,
  BLOWBEND4,
  BLOWBEND5,
  OVERDRAW1,
  OVERDRAW2,
  OVERBLOW1,
  OVERBLOW2,
} from '../../../interaction'

import { mapHoleTierToInteractionid } from './map-hole-tier-to-interactionid'

test('mapHoleTierToInteractionid can map a holes blow and draw tiers with no bends', () => {
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

  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 0)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 1)).toBe(DRAW)
})

test('mapHoleTierToInteractionid can map a holes blow, draw and bend tiers with single level bends present (lower harp)', () => {
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

  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 0)).toBe(OVERBLOW1)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 1)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 2)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 3)).toBe(BEND1)
})

test('mapHoleTierToInteractionid can map a holes blow, draw and bend tiers with single level bends present (upper harp)', () => {
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

  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 0)).toBe(BLOWBEND1)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 1)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 2)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 3)).toBe(OVERDRAW1)
})

test('mapHoleTierToInteractionid can map a holes blow, draw and bend tiers with multi level bends present (lower harp)', () => {
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

  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 0)).toBe(OVERBLOW2)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 1)).toBe(OVERBLOW1)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 2)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 3)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 4)).toBe(BEND1)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 5)).toBe(BEND2)
})

test('mapHoleTierToInteractionid can map a holes blow, draw and bend tiers with multi level bends present (upper harp)', () => {
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

  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 0)).toBe(BLOWBEND2)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 1)).toBe(BLOWBEND1)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 2)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 3)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 4)).toBe(OVERDRAW1)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 5)).toBe(OVERDRAW2)
})

test('mapHoleTierToInteractionid can map a holes blow, draw, and undefined bend tiers with multi level bends present (lower harp)', () => {
  const hole: Hole = {
    blow: 0,
    draw: 6,
    bends: [1, 2, 3, 4, 5],
    blowbends: [],
    overblows: [7, 8],
    overdraws: [],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 11,
    blowRow: 3,
  }

  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 0)).toBeFalsy()
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 1)).toBe(OVERBLOW2)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 2)).toBe(OVERBLOW1)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 3)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 4)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 5)).toBe(BEND1)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 6)).toBe(BEND2)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 7)).toBe(BEND3)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 8)).toBe(BEND4)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 9)).toBe(BEND5)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 10)).toBeFalsy()
})

test('mapHoleTierToInteractionid can map a holes blow, draw and bend tiers with multi level bends present (upper harp)', () => {
  const hole: Hole = {
    blow: 6,
    draw: 0,
    bends: [],
    blowbends: [1, 2, 3, 4, 5],
    overblows: [],
    overdraws: [7, 8],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 11,
    blowRow: 6,
  }

  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 0)).toBeFalsy()
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 1)).toBe(BLOWBEND5)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 2)).toBe(BLOWBEND4)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 3)).toBe(BLOWBEND3)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 4)).toBe(BLOWBEND2)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 5)).toBe(BLOWBEND1)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 6)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 7)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 8)).toBe(OVERDRAW1)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 9)).toBe(OVERDRAW2)
  expect(mapHoleTierToInteractionid(matrixSpecs, hole, 10)).toBeFalsy()
})
