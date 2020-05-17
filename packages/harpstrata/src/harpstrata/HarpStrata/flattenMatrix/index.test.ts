import { C, D } from '../../Pitch'
import type { PitchMatrix, PitchRow } from '../../Pitch'
import { ROOT, SECOND } from '../../Degree'
import type { DegreeMatrix, DegreeRow } from '../../Degree'

import { flattenDegreeMatrix, flattenPitchMatrix } from './index'

test('flattenDegreeMatrix should convert a DegreeMatrix to an extended DegreeRow', () => {
  const degreeMatrix: DegreeMatrix = [[ ROOT ], [ SECOND ]]
  const expectedDegreeRow: DegreeRow = [ ROOT, SECOND ]

  expect(flattenDegreeMatrix(degreeMatrix)).toStrictEqual(expectedDegreeRow)
})

test('flattenPitchMatrix should convert a PitchMatrix to an extended PitchRow', () => {
  const pitchMatrix: PitchMatrix = [[ C ], [ D ]]
  const expectedPitchRow: PitchRow = [ C, D ]

  expect(flattenPitchMatrix(pitchMatrix)).toStrictEqual(expectedPitchRow)
})
