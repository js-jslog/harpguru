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
  const prevViewableMatrix = [[
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
  ],[]] as const
  const notFitColumnBounds = [1, 2] as const
  const notFitPrevViewableMatrix = [[
    [second, third],
    [second, third],
    [second, third],
  ],[]] as const
  const fullMatrix = [[
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
  ], []] as const
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

test('identical full degree matrix is returned when columnBounds is FIT (if doesnt match previous matrix)', () => {
  const columnBounds = 'FIT'
  const prevViewableMatrix = [[[fifth]], []] as const
  const fullMatrix1 = [[
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
  ], []] as const
  const fullMatrix2 = [[
    [root, second, third, fourth, undefined],
    [root, second, third, fourth, fifth],
    [root, undefined, third, fourth, fifth],
  ], []] as const
  const fullMatrix3 = [[
    [getDegree(DegreeIds.Root), undefined],
    [getDegree(DegreeIds.Root), getDegree(DegreeIds.Third)],
    [undefined, getDegree(DegreeIds.Third)],
  ], []] as const

  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix1,
      columnBounds
    )
  ).toBe(fullMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      columnBounds
    )
  ).toBe(fullMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      columnBounds
    )
  ).toBe(fullMatrix3)
})

test('sliced degree matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const prevViewableMatrix = [[[fifth]], []] as const
  const fullMatrix1 = [[
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
  ], []] as const
  const slicedMatrix1 = [[
    [root, second],
    [root, second],
    [root, second],
  ], []] as const
  const fullMatrix2 = [[
    [root, second, third, fourth, undefined],
    [root, second, third, fourth, fifth],
    [root, undefined, third, fourth, fifth],
  ], []] as const
  const slicedMatrix2 = [[
    [root, second],
    [root, second],
    [root, undefined],
  ], []] as const
  const fullMatrix3 = [[
    [root, undefined],
    [root, third],
    [undefined, third],
  ], []] as const

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

test('identical full pitch matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const prevViewableMatrix = [[[g]], []] as const
  const fullMatrix1 = [[
    [c, d, e, f, g],
    [c, d, e, f, g],
    [c, d, e, f, g],
  ], []] as const
  const fullMatrix2 = [[
    [c, d, e, f, undefined],
    [c, d, e, f, g],
    [c, undefined, e, f, g],
  ], []] as const
  const fullMatrix3 = [[
    [getPitch(PitchIds.C), undefined],
    [getPitch(PitchIds.C), getPitch(PitchIds.E)],
    [undefined, getPitch(PitchIds.E)],
  ], []] as const

  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix1,
      columnBounds
    )
  ).toBe(fullMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      columnBounds
    )
  ).toBe(fullMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      columnBounds
    )
  ).toBe(fullMatrix3)
})

test('sliced pitch matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const prevViewableMatrix = [[[g]], []] as const
  const fullMatrix1 = [[
    [c, d, e, f, g],
    [c, d, e, f, g],
    [c, d, e, f, g],
  ], []] as const
  const slicedMatrix1 = [[
    [c, d],
    [c, d],
    [c, d],
  ], []] as const
  const fullMatrix2 = [[
    [c, d, e, f, undefined],
    [c, d, e, f, g],
    [c, undefined, e, f, g],
  ], []] as const
  const slicedMatrix2 = [[
    [c, d],
    [c, d],
    [c, undefined],
  ], []] as const
  const fullMatrix3 = [[
    [c, undefined],
    [c, e],
    [undefined, e],
  ], []] as const

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

test('identical full interaction matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const prevViewableMatrix = [[[drawbend]], []] as const
  const fullMatrix1 = [[
    [blow, blow, blow, blow, blow],
    [draw, draw, draw, draw, draw],
    [drawbend, drawbend, drawbend, drawbend, drawbend],
  ], []] as const
  const fullMatrix2 = [[
    [overblow, overblow, overblow, overblow, undefined],
    [blow, blow, blow, blow, blow],
    [draw, draw, draw, draw, draw],
    [drawbend, undefined, drawbend, drawbend, drawbend],
  ], []] as const
  const fullMatrix3 = [[
    [blowbend, undefined],
    [blow, blow],
    [draw, draw],
    [undefined, drawbend],
  ], []] as const

  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix1,
      columnBounds
    )
  ).toBe(fullMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      columnBounds
    )
  ).toBe(fullMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      columnBounds
    )
  ).toBe(fullMatrix3)
})

test('sliced interaction matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const prevViewableMatrix = [[[drawbend]], []] as const
  const fullMatrix1 = [[
    [blow, blow, blow, blow, blow],
    [draw, draw, draw, draw, draw],
    [drawbend, drawbend, drawbend, drawbend, drawbend],
  ], []] as const
  const slicedMatrix1 = [[
    [blow, blow],
    [draw, draw],
    [drawbend, drawbend],
  ], []] as const
  const fullMatrix2 = [[
    [overblow, overblow, overblow, overblow, undefined],
    [blow, blow, blow, blow, blow],
    [draw, draw, draw, draw, draw],
    [drawbend, undefined, drawbend, drawbend, drawbend],
  ], []] as const
  const slicedMatrix2 = [[
    [overblow, overblow],
    [blow, blow],
    [draw, draw],
    [drawbend, undefined],
  ], []] as const
  const fullMatrix3 = [[
    [blowbend, undefined],
    [blow, blow],
    [draw, draw],
    [undefined, drawbend],
  ], []] as const

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
