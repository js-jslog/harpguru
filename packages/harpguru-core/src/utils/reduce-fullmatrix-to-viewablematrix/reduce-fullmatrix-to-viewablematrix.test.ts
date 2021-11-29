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
  const interactionMatrix = {
    harpface1: [
      [blowbend, blowbend, blowbend, blowbend, blowbend],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
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
      interactionMatrix,
      actualFitColumnBounds
    )
  ).toBe(prevViewableMatrix)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix,
      interactionMatrix,
      effectiveFitColumnBounds
    )
  ).toBe(prevViewableMatrix)
  expect(
    reduceFullMatrixToViewableMatrix(
      notFitPrevViewableMatrix,
      fullMatrix,
      interactionMatrix,
      notFitColumnBounds
    )
  ).toBe(notFitPrevViewableMatrix)
})

test('untrimmed full degree matrix is returned when columnBounds is FIT (if doesnt match previous matrix)', () => {
  const columnBounds = 'FIT'
  const prevViewableMatrix = {
    harpface1: [[fifth]],
  }
  const interactionMatrix = {
    harpface1: [
      [blowbend, blowbend, blowbend, blowbend, blowbend],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
    ],
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
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(fullMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(fullMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(fullMatrix3)
})

test('sliced degree matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const prevViewableMatrix = { harpface1: [[fifth]] }
  const interactionMatrix = {
    harpface1: [
      [blowbend, blowbend, blowbend, blowbend, blowbend],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
    ],
  }
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
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(fullMatrix3)
})

test('untrimmed full pitch matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const prevViewableMatrix = { harpface1: [[g]] }
  const interactionMatrix = {
    harpface1: [
      [blowbend, blowbend, blowbend, blowbend, blowbend],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
    ],
  }
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
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(fullMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(fullMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(fullMatrix3)
})

test('sliced pitch matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const prevViewableMatrix = { harpface1: [[g]] }
  const interactionMatrix = {
    harpface1: [
      [blowbend, blowbend, blowbend, blowbend, blowbend],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
    ],
  }
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
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(fullMatrix3)
})

test('untrimmed full interaction matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const prevViewableMatrix = { harpface1: [[drawbend]] }
  const interactionMatrix = {
    harpface1: [
      [blowbend, blowbend, blowbend, blowbend, blowbend],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [drawbend, drawbend, drawbend, drawbend, drawbend],
    ],
  }
  const fullMatrix1 = {
    harpface1: [
      [overblow, overblow, overblow, overblow, undefined],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [drawbend, undefined, drawbend, drawbend, drawbend],
    ],
  }
  const fullMatrix2 = {
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
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(fullMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(fullMatrix2)
})

// TODO: I don't think all of these permutations of the test should be in this particular test file.
// I think the genericability of the consitituent functions should be tested  in their own test files.
test('sliced interaction matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const prevViewableMatrix = { harpface1: [[drawbend]] }
  const interactionMatrix = {
    harpface1: [
      [blowbend, blowbend, blowbend, blowbend, blowbend],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [drawbend, drawbend, drawbend, drawbend, drawbend],
    ],
  }
  const fullMatrix1 = {
    harpface1: [
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [drawbend, drawbend, drawbend, drawbend, drawbend],
      [undefined, undefined, undefined, undefined, undefined],
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
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(fullMatrix3)
})

test('sliced matrix excludes empty rows', () => {
  const columnBounds = [0, 1] as const
  const prevViewableMatrix = { harpface1: [[drawbend]] }
  const interactionMatrix = {
    harpface1: [
      [blowbend, blowbend, blowbend, blowbend, blowbend],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [drawbend, drawbend, drawbend, drawbend, drawbend],
    ],
  }
  const fullMatrix1 = {
    harpface1: [
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [undefined, undefined, drawbend, drawbend, drawbend],
      [undefined, undefined, undefined, undefined, undefined],
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
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix1)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix2,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix2)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix3,
      interactionMatrix,
      columnBounds
    )
  ).toStrictEqual(slicedMatrix3)
})

test('a chromatic harp can be trimmed and has its non-homerow interactions removed', () => {
  const actualFitColumnBounds = 'FIT'
  const trimmedColumnBounds = [1, 4] as const
  const prevViewableMatrix = {
    harpface1: [
      [root, root, root, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, third, third],
    ],
    harpface2: [
      [root, root, root, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, third, third],
    ],
  }
  const fullMatrix = {
    harpface1: [
      [root, root, root, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, third, third],
    ],
    harpface2: [
      [root, root, root, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, third, third],
    ],
  }
  const interactionMatrix = {
    harpface1: [
      [blowbend, blowbend, blowbend, blowbend, blowbend],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
    ],
    harpface2: [
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [drawbend, drawbend, drawbend, drawbend, drawbend],
    ],
  }
  const nextFitViewableMatrix = {
    harpface1: [
      [root, second, third, fourth, fifth],
      [root, second, third, third, third],
    ],
    harpface2: [
      [root, root, root, fourth, fifth],
      [root, second, third, fourth, fifth],
    ],
  }
  const nextTrimmedViewableMatrix = {
    harpface1: [
      [second, third, fourth, fifth],
      [second, third, third, third],
    ],
    harpface2: [
      [root, root, fourth, fifth],
      [second, third, fourth, fifth],
    ],
  }
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix,
      interactionMatrix,
      actualFitColumnBounds
    )
  ).toStrictEqual(nextFitViewableMatrix)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullMatrix,
      interactionMatrix,
      trimmedColumnBounds
    )
  ).toStrictEqual(nextTrimmedViewableMatrix)
})

test('an identical chromatic viewable matrices is returned if a match is made', () => {
  const actualFitColumnBounds = 'FIT'
  const trimmedColumnBounds = [1, 4] as const
  const prevFitViewableMatrix = {
    harpface1: [
      [root, second, third, fourth, fifth],
      [root, second, third, third, third],
    ],
    harpface2: [
      [root, root, root, fourth, fifth],
      [root, second, third, fourth, fifth],
    ],
  }
  const prevTrimmedViewableMatrix = {
    harpface1: [
      [second, third, fourth, fifth],
      [second, third, third, third],
    ],
    harpface2: [
      [root, root, fourth, fifth],
      [second, third, fourth, fifth],
    ],
  }
  const fullMatrix = {
    harpface1: [
      [root, root, root, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, third, third],
    ],
    harpface2: [
      [root, root, root, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, third, third],
    ],
  }
  const interactionMatrix = {
    harpface1: [
      [blowbend, blowbend, blowbend, blowbend, blowbend],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
    ],
    harpface2: [
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [drawbend, drawbend, drawbend, drawbend, drawbend],
    ],
  }
  expect(
    reduceFullMatrixToViewableMatrix(
      prevFitViewableMatrix,
      fullMatrix,
      interactionMatrix,
      actualFitColumnBounds
    )
  ).toBe(prevFitViewableMatrix)
  expect(
    reduceFullMatrixToViewableMatrix(
      prevTrimmedViewableMatrix,
      fullMatrix,
      interactionMatrix,
      trimmedColumnBounds
    )
  ).toBe(prevTrimmedViewableMatrix)
})

test('an error is thrown if the chromatic / diatonic type of the interaction & input matrix dont match', () => {
  const columnBounds = 'FIT'
  const prevViewableMatrix = { harpface1: [[root]] }
  const fullDiatonicMatrix = {
    harpface1: [
      [root, root, root, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, third, third],
    ],
  }
  const interactionDiatonicMatrix = {
    harpface1: [
      [blowbend, blowbend, blowbend, blowbend, blowbend],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
    ],
  }
  const fullChromaticMatrix = {
    harpface1: [
      [root, root, root, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, third, third],
    ],
    harpface2: [
      [root, root, root, fourth, fifth],
      [root, second, third, fourth, fifth],
      [root, second, third, third, third],
    ],
  }
  const interactionChromaticMatrix = {
    harpface1: [
      [blowbend, blowbend, blowbend, blowbend, blowbend],
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
    ],
    harpface2: [
      [blow, blow, blow, blow, blow],
      [draw, draw, draw, draw, draw],
      [drawbend, drawbend, drawbend, drawbend, drawbend],
    ],
  }
  expect(() =>
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullDiatonicMatrix,
      interactionChromaticMatrix,
      columnBounds
    )
  ).toThrow()
  expect(() =>
    reduceFullMatrixToViewableMatrix(
      prevViewableMatrix,
      fullChromaticMatrix,
      interactionDiatonicMatrix,
      columnBounds
    )
  ).toThrow()
})
