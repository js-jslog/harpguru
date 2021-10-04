import {
  getDegree,
  DegreeIds,
  getPitch,
  PitchIds,
  InteractionIds,
} from 'harpparts'

import { deriveViewableMatrix } from './derive-viewablematrix'

const root = getDegree(DegreeIds.Root)
const second = getDegree(DegreeIds.Second)
const third = getDegree(DegreeIds.Third)
const fourth = getDegree(DegreeIds.Fourth)
const fifth = getDegree(DegreeIds.Fifth)

const c = getPitch(PitchIds.C)
const d = getPitch(PitchIds.D)
const e = getPitch(PitchIds.E)
const f = getPitch(PitchIds.F)
const g = getPitch(PitchIds.G)

const blow = { id: InteractionIds.Blow }
const draw = { id: InteractionIds.Draw }
const blowbend = { id: InteractionIds.BlowBend1 }
const drawbend = { id: InteractionIds.DrawBend1 }
const overblow = { id: InteractionIds.OverBlow1 }

test('identical degree matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const fullMatrix1 = [
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
  ]
  const fullMatrix2 = [
    [root, second, third, fourth, undefined],
    [root, second, third, fourth, fifth],
    [root, undefined, third, fourth, fifth],
  ]
  const fullMatrix3 = [
    [getDegree(DegreeIds.Root), undefined],
    [getDegree(DegreeIds.Root), getDegree(DegreeIds.Third)],
    [undefined, getDegree(DegreeIds.Third)],
  ]

  expect(deriveViewableMatrix(fullMatrix1, columnBounds)).toBe(fullMatrix1)
  expect(deriveViewableMatrix(fullMatrix2, columnBounds)).toBe(fullMatrix2)
  expect(deriveViewableMatrix(fullMatrix3, columnBounds)).toBe(fullMatrix3)
})

test('sliced degree matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const fullMatrix1 = [
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
  ]
  const slicedMatrix1 = [
    [root, second],
    [root, second],
    [root, second],
  ]
  const fullMatrix2 = [
    [root, second, third, fourth, undefined],
    [root, second, third, fourth, fifth],
    [root, undefined, third, fourth, fifth],
  ]
  const slicedMatrix2 = [
    [root, second],
    [root, second],
    [root, undefined],
  ]
  const fullMatrix3 = [
    [root, undefined],
    [root, third],
    [undefined, third],
  ]

  expect(deriveViewableMatrix(fullMatrix1, columnBounds)).toStrictEqual(
    slicedMatrix1
  )
  expect(deriveViewableMatrix(fullMatrix2, columnBounds)).toStrictEqual(
    slicedMatrix2
  )
  expect(deriveViewableMatrix(fullMatrix3, columnBounds)).toStrictEqual(
    fullMatrix3
  )
})

test('identical pitch matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const fullMatrix1 = [
    [c, d, e, f, g],
    [c, d, e, f, g],
    [c, d, e, f, g],
  ]
  const fullMatrix2 = [
    [c, d, e, f, undefined],
    [c, d, e, f, g],
    [c, undefined, e, f, g],
  ]
  const fullMatrix3 = [
    [getPitch(PitchIds.C), undefined],
    [getPitch(PitchIds.C), getPitch(PitchIds.E)],
    [undefined, getPitch(PitchIds.E)],
  ]

  expect(deriveViewableMatrix(fullMatrix1, columnBounds)).toBe(fullMatrix1)
  expect(deriveViewableMatrix(fullMatrix2, columnBounds)).toBe(fullMatrix2)
  expect(deriveViewableMatrix(fullMatrix3, columnBounds)).toBe(fullMatrix3)
})

test('sliced pitch matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const fullMatrix1 = [
    [c, d, e, f, g],
    [c, d, e, f, g],
    [c, d, e, f, g],
  ]
  const slicedMatrix1 = [
    [c, d],
    [c, d],
    [c, d],
  ]
  const fullMatrix2 = [
    [c, d, e, f, undefined],
    [c, d, e, f, g],
    [c, undefined, e, f, g],
  ]
  const slicedMatrix2 = [
    [c, d],
    [c, d],
    [c, undefined],
  ]
  const fullMatrix3 = [
    [c, undefined],
    [c, e],
    [undefined, e],
  ]

  expect(deriveViewableMatrix(fullMatrix1, columnBounds)).toStrictEqual(
    slicedMatrix1
  )
  expect(deriveViewableMatrix(fullMatrix2, columnBounds)).toStrictEqual(
    slicedMatrix2
  )
  expect(deriveViewableMatrix(fullMatrix3, columnBounds)).toStrictEqual(
    fullMatrix3
  )
})

test('identical interaction matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const fullMatrix1 = [
    [blow, blow, blow, blow, blow],
    [draw, draw, draw, draw, draw],
    [drawbend, drawbend, drawbend, drawbend, drawbend],
  ]
  const fullMatrix2 = [
    [overblow, overblow, overblow, overblow, undefined],
    [blow, blow, blow, blow, blow],
    [draw, draw, draw, draw, draw],
    [drawbend, undefined, drawbend, drawbend, drawbend],
  ]
  const fullMatrix3 = [
    [blowbend, undefined],
    [blow, blow],
    [draw, draw],
    [undefined, drawbend],
  ]

  expect(deriveViewableMatrix(fullMatrix1, columnBounds)).toBe(fullMatrix1)
  expect(deriveViewableMatrix(fullMatrix2, columnBounds)).toBe(fullMatrix2)
  expect(deriveViewableMatrix(fullMatrix3, columnBounds)).toBe(fullMatrix3)
})

test('sliced interaction matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const fullMatrix1 = [
    [blow, blow, blow, blow, blow],
    [draw, draw, draw, draw, draw],
    [drawbend, drawbend, drawbend, drawbend, drawbend],
  ]
  const slicedMatrix1 = [
    [blow, blow],
    [draw, draw],
    [drawbend, drawbend],
  ]
  const fullMatrix2 = [
    [overblow, overblow, overblow, overblow, undefined],
    [blow, blow, blow, blow, blow],
    [draw, draw, draw, draw, draw],
    [drawbend, undefined, drawbend, drawbend, drawbend],
  ]
  const slicedMatrix2 = [
    [overblow, overblow],
    [blow, blow],
    [draw, draw],
    [drawbend, undefined],
  ]
  const fullMatrix3 = [
    [blowbend, undefined],
    [blow, blow],
    [draw, draw],
    [undefined, drawbend],
  ]

  expect(deriveViewableMatrix(fullMatrix1, columnBounds)).toStrictEqual(
    slicedMatrix1
  )
  expect(deriveViewableMatrix(fullMatrix2, columnBounds)).toStrictEqual(
    slicedMatrix2
  )
  expect(deriveViewableMatrix(fullMatrix3, columnBounds)).toStrictEqual(
    fullMatrix3
  )
})
