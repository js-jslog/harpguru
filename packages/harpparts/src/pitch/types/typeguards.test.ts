import { generatePitch } from '../generate-pitch'
import { PozitionIds } from '../../pozition'
import { getPitch, getPozition } from '../../access-parts'

import { isPitchId, isNaturalPitch, isPitch } from './typeguards'

import { PitchIds } from './types'

test('isPitchId returns true for a PitchIds and false otherwise', () => {
  const { C: pitchId } = PitchIds
  const { First: pozitionId } = PozitionIds

  expect(isPitchId(pitchId)).toBeTruthy()
  expect(isPitchId(pozitionId)).toBeFalsy()
})

test('isNaturalPitch returns true for a natural Pitch and false otherwise', () => {
  const c = generatePitch(PitchIds.C)
  const db = generatePitch(PitchIds.Db)

  expect(isNaturalPitch(c)).toBeTruthy()
  expect(isNaturalPitch(db)).toBeFalsy()
})

test('isPitch returns true for a Pitch and false otherwise', () => {
  const pitch = getPitch(PitchIds.A)
  const pozition = getPozition(PozitionIds.First)

  expect(isPitch(pitch)).toBeTruthy()
  expect(isPitch(pozition)).toBeFalsy()
})
