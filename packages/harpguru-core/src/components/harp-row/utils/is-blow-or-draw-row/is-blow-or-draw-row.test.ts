import { getHarpStrata } from 'harpstrata'
import { TuningIds, PitchIds, PozitionIds } from 'harpparts'

import { isBlowOrDrawRow, isBlowRow, isDrawRow } from './is-blow-or-draw-row'

const harpStrataProps = {
  tuningId: TuningIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}

const activeHarpStrata = getHarpStrata(harpStrataProps)

test('isBlowRow returns true for a blow row and false otherwise', () => {
  const forBlowRow = isBlowRow(2, activeHarpStrata)
  const forDrawRow = isBlowRow(3, activeHarpStrata)
  const forBendRow = isBlowRow(4, activeHarpStrata)

  expect(forBlowRow).toBeTruthy()
  expect(forDrawRow).toBeFalsy()
  expect(forBendRow).toBeFalsy()
})

test('isDrawRow returns true for a blow row and false otherwise', () => {
  const forBlowRow = isDrawRow(2, activeHarpStrata)
  const forDrawRow = isDrawRow(3, activeHarpStrata)
  const forBendRow = isDrawRow(4, activeHarpStrata)

  expect(forBlowRow).toBeFalsy()
  expect(forDrawRow).toBeTruthy()
  expect(forBendRow).toBeFalsy()
})

test('isBlowOrDrawRow returns true for a blow or draw row and false otherwise', () => {
  const forBlowRow = isBlowOrDrawRow(2, activeHarpStrata)
  const forDrawRow = isBlowOrDrawRow(3, activeHarpStrata)
  const forBendRow = isBlowOrDrawRow(4, activeHarpStrata)

  expect(forBlowRow).toBeTruthy()
  expect(forDrawRow).toBeTruthy()
  expect(forBendRow).toBeFalsy()
})
