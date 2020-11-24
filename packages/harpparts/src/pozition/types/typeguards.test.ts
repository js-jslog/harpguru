import { PitchIds } from '../../pitch'

import { isPozitionId } from './typeguards'

import { PozitionIds } from './types'

test('isPozitionId returns true for a PozitionIds and false otherwise', () => {
  const { C: pitchId } = PitchIds
  const { First: pozitionId } = PozitionIds

  expect(isPozitionId(pozitionId)).toBeTruthy()
  expect(isPozitionId(pitchId)).toBeFalsy()
})
