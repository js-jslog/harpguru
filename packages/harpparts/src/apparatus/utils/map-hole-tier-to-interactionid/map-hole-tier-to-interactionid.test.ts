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
  VALVEDBLOW1,
  VALVEDDRAW1,
} from '../../../interaction'

import { mapHoleTierToInteractionid } from './map-hole-tier-to-interactionid'

test('mapHoleTierToInteractionid can map a holes blow and draw tiers with no bends', () => {
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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(DRAW)
})

test('mapHoleTierToInteractionid can map a holes blow, draw and bend tiers with single level bends present (lower harp)', () => {
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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBe(OVERBLOW1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(BEND1)
})

test('mapHoleTierToInteractionid can map a holes blow, draw and bend tiers with single level bends present (upper harp)', () => {
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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBe(BLOWBEND1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(OVERDRAW1)
})

test('mapHoleTierToInteractionid can map a holes blow, draw and bend tiers with multi level bends present (lower harp)', () => {
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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBe(OVERBLOW2)
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(OVERBLOW1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 4, hole)).toBe(BEND1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 5, hole)).toBe(BEND2)
})

test('mapHoleTierToInteractionid can map a holes blow, draw and bend tiers with multi level bends present (upper harp)', () => {
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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBe(BLOWBEND2)
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(BLOWBEND1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 4, hole)).toBe(OVERDRAW1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 5, hole)).toBe(OVERDRAW2)
})

test('mapHoleTierToInteractionid can map a holes blow, draw, and undefined bend tiers with multi level bends present (lower harp)', () => {
  const hole: Hole = {
    blow: 0,
    draw: 6,
    blowbends: [],
    drawbends: [1, 2, 3, 4, 5],
    overblows: [7, 8],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 11,
    blowRow: 3,
  }

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBeFalsy()
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(OVERBLOW2)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(OVERBLOW1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 4, hole)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 5, hole)).toBe(BEND1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 6, hole)).toBe(BEND2)
  expect(mapHoleTierToInteractionid(matrixSpecs, 7, hole)).toBe(BEND3)
  expect(mapHoleTierToInteractionid(matrixSpecs, 8, hole)).toBe(BEND4)
  expect(mapHoleTierToInteractionid(matrixSpecs, 9, hole)).toBe(BEND5)
  expect(mapHoleTierToInteractionid(matrixSpecs, 10, hole)).toBeFalsy()
})

test('mapHoleTierToInteractionid can map a holes blow, draw and bend tiers with multi level bends present (upper harp)', () => {
  const hole: Hole = {
    blow: 6,
    draw: 0,
    blowbends: [1, 2, 3, 4, 5],
    drawbends: [],
    overblows: [],
    overdraws: [7, 8],
    valvedblows: [],
    valveddraws: [],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 11,
    blowRow: 6,
  }

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBeFalsy()
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(BLOWBEND5)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(BLOWBEND4)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(BLOWBEND3)
  expect(mapHoleTierToInteractionid(matrixSpecs, 4, hole)).toBe(BLOWBEND2)
  expect(mapHoleTierToInteractionid(matrixSpecs, 5, hole)).toBe(BLOWBEND1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 6, hole)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 7, hole)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 8, hole)).toBe(OVERDRAW1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 9, hole)).toBe(OVERDRAW2)
  expect(mapHoleTierToInteractionid(matrixSpecs, 10, hole)).toBeFalsy()
})

test('mapHoleTierToInteractionid can map a holes blow, draw and valve blow bend tiers with single level bends present (lower harp)', () => {
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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBe(VALVEDBLOW1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(BEND1)
})

test('mapHoleTierToInteractionid can map a holes blow, draw and valved draw bend with single level bends present (upper harp)', () => {
  const hole: Hole = {
    blow: 2,
    draw: 0,
    blowbends: [1],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [-1],
  }
  const matrixSpecs: MatrixSpecs = {
    height: 4,
    blowRow: 1,
  }

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBe(BLOWBEND1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(BLOW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(DRAW)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(VALVEDDRAW1)
})
