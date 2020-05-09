import { PitchIds, C, D, E, F } from '../../../Pitch'
import type { PitchRow } from '../../../Pitch'
import { DegreeIds, ROOT, SECOND, THIRD, FOURTH } from '../../../Degree'
import type { DegreeRow } from '../../../Degree'

import type { RowAccumulator } from './index'
import { activeIdsFromPitchRow, activeIdsFromDegreeRow } from './index'

const degreeRow: DegreeRow = [ ROOT, SECOND, THIRD, FOURTH ]
const pitchRow: PitchRow = [ C, D, E, F ]

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
