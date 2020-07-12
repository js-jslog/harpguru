import { getHarpStrata, ApparatusIds, PozitionIds, PitchIds } from 'harpstrata'

import { isBlowOrDrawRow, isBlowRow, isDrawRow } from './index'

const harpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}

const activeHarpStrata = getHarpStrata(harpStrataProps)

test('isBlowRow returns true for a blow row and false otherwise', () => {
  const harpRowPropsBlow = { activeHarpStrata, yCoord: 2 }
  const harpRowPropsDraw = { activeHarpStrata, yCoord: 3 }
  const harpRowPropsBend = { activeHarpStrata, yCoord: 4 }

  expect(isBlowRow(harpRowPropsBlow)).toBeTruthy()
  expect(isBlowRow(harpRowPropsDraw)).toBeFalsy()
  expect(isBlowRow(harpRowPropsBend)).toBeFalsy()
})

test('isDrawRow returns true for a blow row and false otherwise', () => {
  const harpRowPropsBlow = { activeHarpStrata, yCoord: 2 }
  const harpRowPropsDraw = { activeHarpStrata, yCoord: 3 }
  const harpRowPropsBend = { activeHarpStrata, yCoord: 4 }

  expect(isDrawRow(harpRowPropsBlow)).toBeFalsy()
  expect(isDrawRow(harpRowPropsDraw)).toBeTruthy()
  expect(isDrawRow(harpRowPropsBend)).toBeFalsy()
})

test('isBlowOrDrawRow returns true for a blow or draw row and false otherwise', () => {
  const harpRowPropsBlow = { activeHarpStrata, yCoord: 2 }
  const harpRowPropsDraw = { activeHarpStrata, yCoord: 3 }
  const harpRowPropsBend = { activeHarpStrata, yCoord: 4 }

  expect(isBlowOrDrawRow(harpRowPropsBlow)).toBeTruthy()
  expect(isBlowOrDrawRow(harpRowPropsDraw)).toBeTruthy()
  expect(isBlowOrDrawRow(harpRowPropsBend)).toBeFalsy()
})
