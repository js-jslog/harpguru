import { DegreeIds } from 'harpparts'

import { PitchIds, getPitch } from '../../../../Pitch'
import type { PitchMatrix } from '../../../../Pitch'
import { getDegree } from '../../../../Degree'
import type { DegreeMatrix } from '../../../../Degree'

import type { MatrixAccumulator } from './index'
import { activeIdsFromPitchMatrix, activeIdsFromDegreeMatrix } from './index'

const c = getPitch(PitchIds.C)
const d = getPitch(PitchIds.D)
const e = getPitch(PitchIds.E)
const f = getPitch(PitchIds.F)
const g = getPitch(PitchIds.G)
const a = getPitch(PitchIds.A)
const b = getPitch(PitchIds.B)

const root = getDegree(DegreeIds.Root)
const second = getDegree(DegreeIds.Second)
const third = getDegree(DegreeIds.Third)
const fourth = getDegree(DegreeIds.Fourth)
const fifth = getDegree(DegreeIds.Fifth)
const sixth = getDegree(DegreeIds.Sixth)
const seventh = getDegree(DegreeIds.Seventh)

const degreeMatrix: DegreeMatrix = [
  [root, second, third, fourth],
  [fifth, sixth, seventh, root],
]
const pitchMatrix: PitchMatrix = [
  [c, d, e, f],
  [g, a, b, c],
]

test('activeIdsFromPitchMatrix operates as a reducer to contribute to the counterpart `activePitchIds` part of its accumulator object', () => {
  const activePitchIds = [PitchIds.D, PitchIds.F, PitchIds.G]
  const expectedDegreeIds = [
    DegreeIds.Second,
    DegreeIds.Fourth,
    DegreeIds.Fifth,
  ]

  const initialState: MatrixAccumulator = {
    pitchMatrix,
    degreeMatrix,
    activePitchIds,
    activeDegreeIds: [],
  }

  const { activeDegreeIds } = pitchMatrix.reduce(
    activeIdsFromPitchMatrix,
    initialState
  )

  expect(activeDegreeIds).toStrictEqual(expectedDegreeIds)
})

test('activeIdsFromDegreeMatrix operates as a reducer to contribute to the counterpart `activeDegreeIds` part of its accumulator object', () => {
  const expectedPitchIds = [PitchIds.D, PitchIds.F, PitchIds.G]
  const activeDegreeIds = [DegreeIds.Second, DegreeIds.Fourth, DegreeIds.Fifth]

  const initialState: MatrixAccumulator = {
    degreeMatrix,
    pitchMatrix,
    activePitchIds: [],
    activeDegreeIds,
  }

  const { activePitchIds } = degreeMatrix.reduce(
    activeIdsFromDegreeMatrix,
    initialState
  )

  expect(activePitchIds).toStrictEqual(expectedPitchIds)
})
