import { getHarpStrata } from 'harpstrata'
import { TuningIds, PitchIds, PozitionIds, ValvingIds } from 'harpparts'

import { isBlowOrDrawRow, isBlowRow, isDrawRow } from './is-blow-or-draw-row'

const harpStrataProps = {
  tuningId: TuningIds.MajorDiatonic,
  valvingId: ValvingIds.NotValved,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}

const {
  apparatus: { interactionMatrix },
} = getHarpStrata(harpStrataProps)

test('isBlowRow returns true for a blow row and false otherwise', () => {
  const forBlowRow = isBlowRow(2, interactionMatrix)
  const forDrawRow = isBlowRow(3, interactionMatrix)
  const forBendRow = isBlowRow(4, interactionMatrix)

  expect(forBlowRow).toBeTruthy()
  expect(forDrawRow).toBeFalsy()
  expect(forBendRow).toBeFalsy()
})

test('isDrawRow returns true for a blow row and false otherwise', () => {
  const forBlowRow = isDrawRow(2, interactionMatrix)
  const forDrawRow = isDrawRow(3, interactionMatrix)
  const forBendRow = isDrawRow(4, interactionMatrix)

  expect(forBlowRow).toBeFalsy()
  expect(forDrawRow).toBeTruthy()
  expect(forBendRow).toBeFalsy()
})

test('isBlowOrDrawRow returns true for a blow or draw row and false otherwise', () => {
  const forBlowRow = isBlowOrDrawRow(2, interactionMatrix)
  const forDrawRow = isBlowOrDrawRow(3, interactionMatrix)
  const forBendRow = isBlowOrDrawRow(4, interactionMatrix)

  expect(forBlowRow).toBeTruthy()
  expect(forDrawRow).toBeTruthy()
  expect(forBendRow).toBeFalsy()
})
