import { PozitionIds } from '../types'
import { PitchIds } from '../../Pitch'

import { isPozitionId } from './index'

test('isPozitionId returns true for a PozitionIds and false otherwise', () => {
  const { C: pitchId } = PitchIds
  const { First: pozitionId } = PozitionIds

  expect(isPozitionId(pozitionId)).toBeTruthy()
  expect(isPozitionId(pitchId)).toBeFalsy()
})
