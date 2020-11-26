import { PozitionIds } from 'harpparts'

import { PitchIds } from '../types'
import { getPitch } from '../getPitch'

import { isPitchId, isNaturalPitch } from './index'

test('isPitchId returns true for a PitchIds and false otherwise', () => {
  const { C: pitchId } = PitchIds
  const { First: pozitionId } = PozitionIds

  expect(isPitchId(pitchId)).toBeTruthy()
  expect(isPitchId(pozitionId)).toBeFalsy()
})

test('isNaturalPitch returns true for a natural Pitch and false otherwise', () => {
  const c = getPitch(PitchIds.C)
  const db = getPitch(PitchIds.Db)

  expect(isNaturalPitch(c)).toBeTruthy()
  expect(isNaturalPitch(db)).toBeFalsy()
})
