import type { Hole, HoleArray, MatrixSpecs } from '../../types'

import { deriveMatrixSpecs } from './derive-matrix-specs'

test('deriveMatrixSpecs works on a simple hole array', () => {
  const hole: Hole = {
    blow: 9,
    draw: 10,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const holeArray: HoleArray = [
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
  ]

  const expectedMatrixSpecs: MatrixSpecs = {
    height: 2,
    blowRow: 0,
  }

  const actualMatrixSpecs = deriveMatrixSpecs(holeArray)

  expect(actualMatrixSpecs).toStrictEqual(expectedMatrixSpecs)
})

test('deriveMatrixSpecs works on a simple hole array with some bends', () => {
  const hole: Hole = {
    blow: 9,
    draw: 11,
    blowbends: [],
    bends: [10],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const holeArray: HoleArray = [
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
  ]

  const expectedMatrixSpecs: MatrixSpecs = {
    height: 3,
    blowRow: 0,
  }

  const actualMatrixSpecs = deriveMatrixSpecs(holeArray)

  expect(actualMatrixSpecs).toStrictEqual(expectedMatrixSpecs)
})

test('deriveMatrixSpecs works on a simple hole array with some blowbends', () => {
  const hole: Hole = {
    blow: 12,
    draw: 9,
    blowbends: [10, 11],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const holeArray: HoleArray = [
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
  ]

  const expectedMatrixSpecs: MatrixSpecs = {
    height: 4,
    blowRow: 2,
  }

  const actualMatrixSpecs = deriveMatrixSpecs(holeArray)

  expect(actualMatrixSpecs).toStrictEqual(expectedMatrixSpecs)
})

test('deriveMatrixSpecs works on a simple hole array with some overblows', () => {
  const hole: Hole = {
    blow: 9,
    draw: 10,
    blowbends: [],
    bends: [],
    overblows: [11],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const holeArray: HoleArray = [
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
  ]

  const expectedMatrixSpecs: MatrixSpecs = {
    height: 3,
    blowRow: 1,
  }

  const actualMatrixSpecs = deriveMatrixSpecs(holeArray)

  expect(actualMatrixSpecs).toStrictEqual(expectedMatrixSpecs)
})

test('deriveMatrixSpecs works on a simple hole array with some overdraws', () => {
  const hole: Hole = {
    blow: 10,
    draw: 9,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [11],
    valvedblows: [],
    valveddraws: [],
  }

  const holeArray: HoleArray = [
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
  ]

  const expectedMatrixSpecs: MatrixSpecs = {
    height: 3,
    blowRow: 0,
  }

  const actualMatrixSpecs = deriveMatrixSpecs(holeArray)

  expect(actualMatrixSpecs).toStrictEqual(expectedMatrixSpecs)
})

test('deriveMatrixSpecs works on a simple hole array with some bends and overblows', () => {
  const hole: Hole = {
    blow: 9,
    draw: 11,
    blowbends: [],
    bends: [10],
    overblows: [12],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const holeArray: HoleArray = [
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
  ]

  const expectedMatrixSpecs: MatrixSpecs = {
    height: 4,
    blowRow: 1,
  }

  const actualMatrixSpecs = deriveMatrixSpecs(holeArray)

  expect(actualMatrixSpecs).toStrictEqual(expectedMatrixSpecs)
})

test('deriveMatrixSpecs works on a simple hole array with some overdraws and blowbends', () => {
  const hole: Hole = {
    blow: 12,
    draw: 9,
    blowbends: [10, 11],
    bends: [],
    overblows: [],
    overdraws: [13],
    valvedblows: [],
    valveddraws: [],
  }

  const holeArray: HoleArray = [
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
  ]

  const expectedMatrixSpecs: MatrixSpecs = {
    height: 5,
    blowRow: 2,
  }

  const actualMatrixSpecs = deriveMatrixSpecs(holeArray)

  expect(actualMatrixSpecs).toStrictEqual(expectedMatrixSpecs)
})
