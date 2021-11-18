import {
  getDegree,
  DegreeIds,
  getPitch,
  PitchIds,
  InteractionIds,
} from 'harpparts'

import { reduceFullMatrixToViewableMatrix } from './reduce-fullmatrix-to-viewablematrix'

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

test('previous viewable matrix is returned if reduced one is a match', () => {
  const actualFitColumnBounds = 'FIT'
  const effectiveFitColumnBounds = [0, 4] as const
  const prevViewableMatrix = {
    harpface1: [
      [root, second, third, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, fourth, fifth],
    ],
  }
  const notFitColumnBounds = [1, 2] as const
  const notFitPrevViewableMatrix = {
    harpface1: [
      [second, third],
      [second, third],
      [second, third],
    ],
  }
  const fullMatrix = {
    harpface1: [
      [root, second, third, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, fourth, fifth],
    ],
  }
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix,
      actualFitColumnBounds
    )
  ).toBe(prevViewableMatrix)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix,
      effectiveFitColumnBounds
    )
  ).toBe(prevViewableMatrix)
  expect(
    reduceFullMatrixToViewableMatrix(
      notFitPrevViewableMatrix,
      fullMatrix,
      notFitColumnBounds
    )
  ).toBe(notFitPrevViewableMatrix)
})

test('untrimmed full degree matrix is returned when columnBounds is FIT (if doesnt match previous matrix)', () => {
  const columnBounds = 'FIT'
  const prevViewableMatrix = {
    harpface1: [[fifth]],
  }
  const fullMatrix1 = {
    harpface1: [
      [root, second, third, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, fourth, fifth],
    ],
  }
  const fullMatrix2 = {
    harpface1: [
      [root, second, third, fourth, undefined],
      [root, second, third, fourth, fifth],
      [root, undefined, third, fourth, fifth],
    ],
  }
  const fullMatrix3 = {
    harpface1: [
      [getDegree(DegreeIds.Root), undefined],
      [getDegree(DegreeIds.Root), getDegree(DegreeIds.Third)],
      [undefined, getDegree(DegreeIds.Third)],
    ],
  }

  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix1,
      columnBounds
    )
  ).toStrictEqual(fullMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      columnBounds
    )
  ).toStrictEqual(fullMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      columnBounds
    )
  ).toStrictEqual(fullMatrix3)
})

test('sliced degree matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const prevViewableMatrix = { harpface1: [[fifth]] }
  const fullMatrix1 = {
    harpface1: [
      [root, second, third, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, fourth, fifth],
    ],
  }
  const slicedMatrix1 = {
    harpface1: [
      [root, second],
      [root, second],
      [root, second],
    ],
  }
  const fullMatrix2 = {
    harpface1: [
      [root, second, third, fourth, undefined],
      [root, second, third, fourth, fifth],
      [root, undefined, third, fourth, fifth],
    ],
  }
  const slicedMatrix2 = {
    harpface1: [
      [root, second],
      [root, second],
      [root, undefined],
    ],
  }
  const fullMatrix3 = {
    harpface1: [
      [root, undefined],
      [root, third],
      [undefined, third],
    ],
  }

  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix1,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      columnBounds
    )
  ).toStrictEqual(fullMatrix3)
})

test('untrimmed full pitch matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const prevViewableMatrix = { harpface1: [[g]] }
  const fullMatrix1 = {
    harpface1: [
      [c, d, e, f, g],
      [c, d, e, f, g],
      [c, d, e, f, g],
    ],
  }
  const fullMatrix2 = {
    harpface1: [
      [c, d, e, f, undefined],
      [c, d, e, f, g],
      [c, undefined, e, f, g],
    ],
  }
  const fullMatrix3 = {
    harpface1: [
      [getPitch(PitchIds.C), undefined],
      [getPitch(PitchIds.C), getPitch(PitchIds.E)],
      [undefined, getPitch(PitchIds.E)],
    ],
  }

  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix1,
      columnBounds
    )
  ).toStrictEqual(fullMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      columnBounds
    )
  ).toStrictEqual(fullMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      columnBounds
    )
  ).toStrictEqual(fullMatrix3)
})

test('sliced pitch matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const prevViewableMatrix = { harpface1: [[g]] }
  const fullMatrix1 = {
    harpface1: [
      [c, d, e, f, g],
      [c, d, e, f, g],
      [c, d, e, f, g],
    ],
  }
  const slicedMatrix1 = {
    harpface1: [
      [c, d],
      [c, d],
      [c, d],
    ],
  }
  const fullMatrix2 = {
    harpface1: [
      [c, d, e, f, undefined],
      [c, d, e, f, g],
      [c, undefined, e, f, g],
    ],
  }
  const slicedMatrix2 = {
    harpface1: [
      [c, d],
      [c, d],
      [c, undefined],
    ],
  }
  const fullMatrix3 = {
    harpface1: [
      [c, undefined],
      [c, e],
      [undefined, e],
    ],
  }

  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix1,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      columnBounds
    )
  ).toStrictEqual(fullMatrix3)
})

test('untrimmed full interaction matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const prevViewableMatrix = { harpface1: [[drawbend]] }
  const fullMatrix1 = {
    harpface1: [
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [drawbend, drawbend, drawbend, drawbend, drawbend],
    ],
  }
  const fullMatrix2 = {
    harpface1: [
      [overblow, overblow, overblow, overblow, undefined],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [drawbend, undefined, drawbend, drawbend, drawbend],
    ],
  }
  const fullMatrix3 = {
    harpface1: [
      [blowbend, undefined],
      [blow, blow],
      [draw, draw],
      [undefined, drawbend],
    ],
  }

  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix1,
      columnBounds
    )
  ).toStrictEqual(fullMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      columnBounds
    )
  ).toStrictEqual(fullMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      columnBounds
    )
  ).toStrictEqual(fullMatrix3)
})

test('sliced interaction matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const prevViewableMatrix = { harpface1: [[drawbend]] }
  const fullMatrix1 = {
    harpface1: [
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [drawbend, drawbend, drawbend, drawbend, drawbend],
    ],
  }
  const slicedMatrix1 = {
    harpface1: [
      [blow, blow],
      [draw, draw],
      [drawbend, drawbend],
    ],
  }
  const fullMatrix2 = {
    harpface1: [
      [overblow, overblow, overblow, overblow, undefined],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [drawbend, undefined, drawbend, drawbend, drawbend],
    ],
  }
  const slicedMatrix2 = {
    harpface1: [
      [overblow, overblow],
      [blow, blow],
      [draw, draw],
      [drawbend, undefined],
    ],
  }
  const fullMatrix3 = {
    harpface1: [
      [blowbend, undefined],
      [blow, blow],
      [draw, draw],
      [undefined, drawbend],
    ],
  }

  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix1,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      columnBounds
    )
  ).toStrictEqual(fullMatrix3)
})

test('sliced matrix includes empty rows', () => {
  const columnBounds = [0, 1] as const
  const prevViewableMatrix = { harpface1: [[drawbend]] }
  const fullMatrix1 = {
    harpface1: [
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [undefined, undefined, drawbend, drawbend, drawbend],
    ],
  }
  const slicedMatrix1 = {
    harpface1: [
      [blow, blow],
      [draw, draw],
    ],
  }
  const fullMatrix2 = {
    harpface1: [
      [undefined, undefined, overblow, overblow, undefined],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [undefined, undefined, drawbend, drawbend, drawbend],
    ],
  }
  const slicedMatrix2 = {
    harpface1: [
      [blow, blow],
      [draw, draw],
    ],
  }
  const fullMatrix3 = {
    harpface1: [
      [undefined, undefined],
      [blow, blow],
      [draw, draw],
      [undefined, drawbend],
    ],
  }
  const slicedMatrix3 = {
    harpface1: [
      [blow, blow],
      [draw, draw],
      [undefined, drawbend],
    ],
  }

  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix1,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix3)
})
