import { InteractionIds } from '../../types'
import type { Hole, MatrixSpecs } from '../../types'

import { mapHoleTierToInteractionid } from './map-hole-tier-to-interactionid'

const {
  Blow,
  Draw,
  Bend1,
  Bend2,
  Bend3,
  Bend4,
  Bend5,
  BlowBend1,
  BlowBend2,
  BlowBend3,
  BlowBend4,
  BlowBend5,
  OverDraw1,
  OverDraw2,
  OverBlow1,
  OverBlow2,
} = InteractionIds

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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBe(Blow)
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(Draw)
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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBe(OverBlow1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(Blow)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(Draw)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(Bend1)
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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBe(BlowBend1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(Blow)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(Draw)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(OverDraw1)
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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBe(OverBlow2)
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(OverBlow1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(Blow)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(Draw)
  expect(mapHoleTierToInteractionid(matrixSpecs, 4, hole)).toBe(Bend1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 5, hole)).toBe(Bend2)
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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBe(BlowBend2)
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(BlowBend1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(Blow)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(Draw)
  expect(mapHoleTierToInteractionid(matrixSpecs, 4, hole)).toBe(OverDraw1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 5, hole)).toBe(OverDraw2)
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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBeFalsy()
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(OverBlow2)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(OverBlow1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(Blow)
  expect(mapHoleTierToInteractionid(matrixSpecs, 4, hole)).toBe(Draw)
  expect(mapHoleTierToInteractionid(matrixSpecs, 5, hole)).toBe(Bend1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 6, hole)).toBe(Bend2)
  expect(mapHoleTierToInteractionid(matrixSpecs, 7, hole)).toBe(Bend3)
  expect(mapHoleTierToInteractionid(matrixSpecs, 8, hole)).toBe(Bend4)
  expect(mapHoleTierToInteractionid(matrixSpecs, 9, hole)).toBe(Bend5)
  expect(mapHoleTierToInteractionid(matrixSpecs, 10, hole)).toBeFalsy()
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

  expect(mapHoleTierToInteractionid(matrixSpecs, 0, hole)).toBeFalsy()
  expect(mapHoleTierToInteractionid(matrixSpecs, 1, hole)).toBe(BlowBend5)
  expect(mapHoleTierToInteractionid(matrixSpecs, 2, hole)).toBe(BlowBend4)
  expect(mapHoleTierToInteractionid(matrixSpecs, 3, hole)).toBe(BlowBend3)
  expect(mapHoleTierToInteractionid(matrixSpecs, 4, hole)).toBe(BlowBend2)
  expect(mapHoleTierToInteractionid(matrixSpecs, 5, hole)).toBe(BlowBend1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 6, hole)).toBe(Blow)
  expect(mapHoleTierToInteractionid(matrixSpecs, 7, hole)).toBe(Draw)
  expect(mapHoleTierToInteractionid(matrixSpecs, 8, hole)).toBe(OverDraw1)
  expect(mapHoleTierToInteractionid(matrixSpecs, 9, hole)).toBe(OverDraw2)
  expect(mapHoleTierToInteractionid(matrixSpecs, 10, hole)).toBeFalsy()
})
