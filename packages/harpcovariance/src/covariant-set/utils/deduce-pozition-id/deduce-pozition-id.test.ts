import { PitchIds, PozitionIds } from 'harpparts'

import { deducePozitionId } from './index'

test('deducePozitionId returns First for a C root on a C harp', () => {
  const { C: rootPitchId } = PitchIds
  const { C: harpKeyId } = PitchIds

  const { First: expectedPozitionId } = PozitionIds
  const actualPozitionId = deducePozitionId({ rootPitchId, harpKeyId })

  expect(actualPozitionId).toBe(expectedPozitionId)
})

test('deducePozitionId returns Second for a G root on a C harp', () => {
  const { G: rootPitchId } = PitchIds
  const { C: harpKeyId } = PitchIds

  const { Second: expectedPozitionId } = PozitionIds
  const actualPozitionId = deducePozitionId({ rootPitchId, harpKeyId })

  expect(actualPozitionId).toBe(expectedPozitionId)
})

test('deducePozitionId returns Ninth for a Eb root on a G harp', () => {
  const { Eb: rootPitchId } = PitchIds
  const { G: harpKeyId } = PitchIds

  const { Ninth: expectedPozitionId } = PozitionIds
  const actualPozitionId = deducePozitionId({ rootPitchId, harpKeyId })

  expect(actualPozitionId).toBe(expectedPozitionId)
})
