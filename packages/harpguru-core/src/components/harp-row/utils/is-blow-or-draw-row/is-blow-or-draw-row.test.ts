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
  const forBlowRow = isBlowRow(2, interactionMatrix[0])
  const forDrawRow = isBlowRow(3, interactionMatrix[0])
  const forBendRow = isBlowRow(4, interactionMatrix[0])

  expect(forBlowRow).toBeTruthy()
  expect(forDrawRow).toBeFalsy()
  expect(forBendRow).toBeFalsy()
})

test('isDrawRow returns true for a blow row and false otherwise', () => {
  const forBlowRow = isDrawRow(2, interactionMatrix[0])
  const forDrawRow = isDrawRow(3, interactionMatrix[0])
  const forBendRow = isDrawRow(4, interactionMatrix[0])

  expect(forBlowRow).toBeFalsy()
  expect(forDrawRow).toBeTruthy()
  expect(forBendRow).toBeFalsy()
})

test('isBlowOrDrawRow returns true for a blow or draw row and false otherwise', () => {
  const forBlowRow = isBlowOrDrawRow(2, interactionMatrix[0])
  const forDrawRow = isBlowOrDrawRow(3, interactionMatrix[0])
  const forBendRow = isBlowOrDrawRow(4, interactionMatrix[0])

  expect(forBlowRow).toBeTruthy()
  expect(forDrawRow).toBeTruthy()
  expect(forBendRow).toBeFalsy()
})
