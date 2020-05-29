import { PitchIds } from '../types'
import { PozitionIds } from '../../Pozition'

import { isPitchId } from './index'

test('isPitchId returns true for a PitchIds and false otherwise', () => {
  const { C: pitchId } = PitchIds
  const { First: pozitionId } = PozitionIds

  expect(isPitchId(pitchId)).toBeTruthy()
  expect(isPitchId(pozitionId)).toBeFalsy()
})
