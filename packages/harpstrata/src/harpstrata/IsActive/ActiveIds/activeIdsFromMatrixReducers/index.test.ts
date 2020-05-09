import { PitchIds, C, D, E, F, G, A, B } from '../../../Pitch'
import type { PitchMatrix } from '../../../Pitch'
import { DegreeIds, ROOT, SECOND, THIRD, FOURTH, FIFTH, SIXTH, SEVENTH } from '../../../Degree'
import type { DegreeMatrix } from '../../../Degree'

import type { MatrixAccumulator } from './index'
import { activeIdsFromPitchMatrix, activeIdsFromDegreeMatrix } from './index'

const degreeMatrix: DegreeMatrix = [
  [ ROOT , SECOND, THIRD  , FOURTH ],
  [ FIFTH, SIXTH , SEVENTH, ROOT   ],
]
const pitchMatrix: PitchMatrix = [
  [ C, D, E, F ],
  [ G, A, B, C ],
]

test('activeIdsFromPitchMatrix operates as a reducer to contribute to the counterpart `activePitchIds` part of it\'s accumulator object', () => {
  const activePitchIds = [ PitchIds.D, PitchIds.F, PitchIds.G ]
  const expectedDegreeIds = [ DegreeIds.Second, DegreeIds.Fourth, DegreeIds.Fifth ]

  const initialState: MatrixAccumulator = { pitchMatrix, degreeMatrix, activePitchIds, activeDegreeIds: [] }

  const { activeDegreeIds } = pitchMatrix.reduce(activeIdsFromPitchMatrix, initialState)

  expect(activeDegreeIds).toStrictEqual(expectedDegreeIds)
})

test('activeIdsFromDegreeMatrix operates as a reducer to contribute to the counterpart `activeDegreeIds` part of it\'s accumulator object', () => {
  const expectedPitchIds = [ PitchIds.D, PitchIds.F, PitchIds.G ]
  const activeDegreeIds = [ DegreeIds.Second, DegreeIds.Fourth, DegreeIds.Fifth ]

  const initialState: MatrixAccumulator = { degreeMatrix, pitchMatrix, activePitchIds: [], activeDegreeIds }

  const { activePitchIds } = degreeMatrix.reduce(activeIdsFromDegreeMatrix, initialState)

  expect(activePitchIds).toStrictEqual(expectedPitchIds)
})
