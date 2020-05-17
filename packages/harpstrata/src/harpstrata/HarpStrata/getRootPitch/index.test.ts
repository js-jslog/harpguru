import type { PitchMatrix } from '../../Pitch'
import { PitchIds, C, D } from '../../Pitch'
import type { DegreeMatrix } from '../../Degree'
import { ROOT, SECOND } from '../../Degree'

import { getRootPitch } from './index'

test('getRootPitch finds the pitch at any root degree from counterpart matrices', () => {
  const degreeMatrix: DegreeMatrix = [[
    ROOT, SECOND
  ]]
  const pitchMatrix: PitchMatrix = [[
    C, D
  ]]
  expect(getRootPitch(degreeMatrix, pitchMatrix)).toBe(PitchIds.C)
})
