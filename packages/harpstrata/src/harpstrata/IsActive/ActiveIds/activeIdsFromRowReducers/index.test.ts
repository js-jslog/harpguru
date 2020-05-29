import { PitchIds, getPitch } from '../../../Pitch'
import type { PitchRow } from '../../../Pitch'
import { DegreeIds, getDegree } from '../../../Degree'
import type { DegreeRow } from '../../../Degree'

import type { RowAccumulator } from './index'
import { activeIdsFromPitchRow, activeIdsFromDegreeRow } from './index'

const c = getPitch(PitchIds.C)
const d = getPitch(PitchIds.D)
const e = getPitch(PitchIds.E)
const f = getPitch(PitchIds.F)

const root = getDegree(DegreeIds.Root)
const second = getDegree(DegreeIds.Second)
const third = getDegree(DegreeIds.Third)
const fourth = getDegree(DegreeIds.Fourth)

const degreeRow: DegreeRow = [ root, second, third, fourth ]
const pitchRow: PitchRow = [ c, d, e, f ]

test('activeIdsFromPitchRow operates as a reducer to contribute to the counterpart `activePitchIds` part of it\'s accumulator object', () => {
  const activePitchIds = [ PitchIds.D, PitchIds.F ]
  const expectedDegreeIds = [ DegreeIds.Second, DegreeIds.Fourth ]

  const initialState: RowAccumulator = { pitchRow, degreeRow, activePitchIds, activeDegreeIds: [] }

  const { activeDegreeIds } = pitchRow.reduce(activeIdsFromPitchRow, initialState)

  expect(activeDegreeIds).toStrictEqual(expectedDegreeIds)
})

test('activeIdsFromDegreeRow operates as a reducer to contribute to the counterpart `activeDegreeIds` part of it\'s accumulator object', () => {
  const activeDegreeIds = [ DegreeIds.Second, DegreeIds.Fourth ]
  const expectedPitchIds = [ PitchIds.D, PitchIds.F ]

  const initialState: RowAccumulator = { degreeRow, pitchRow, activePitchIds: [], activeDegreeIds }

  const { activePitchIds } = degreeRow.reduce(activeIdsFromDegreeRow, initialState)

  expect(activePitchIds).toStrictEqual(expectedPitchIds)
})
