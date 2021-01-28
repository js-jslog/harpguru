import { PitchIds } from '../../pitch'
import { getPitch, getPozition } from '../../access-parts'

import { isPozitionId, isPozition } from './typeguards'

import { PozitionIds } from './types'

test('isPozitionId returns true for a PozitionIds and false otherwise', () => {
  const { C: pitchId } = PitchIds
  const { First: pozitionId } = PozitionIds

  expect(isPozitionId(pozitionId)).toBeTruthy()
  expect(isPozitionId(pitchId)).toBeFalsy()
})

test('isPozition returns true for a Pozition and false otherwise', () => {
  const pitch = getPitch(PitchIds.A)
  const pozition = getPozition(PozitionIds.First)

  expect(isPozition(pozition)).toBeTruthy()
  expect(isPozition(pitch)).toBeFalsy()
})
