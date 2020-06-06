import { exampleHarpFaceProps } from '../../HarpFace'

import { isBlowOrDrawRow, isBlowRow, isDrawRow } from './index'

test('isBlowRow returns true for a blow row and false otherwise', () => {
  const harpRowPropsBlow = { ...exampleHarpFaceProps, yCoord: 2 }
  const harpRowPropsDraw = { ...exampleHarpFaceProps, yCoord: 3 }
  const harpRowPropsBend = { ...exampleHarpFaceProps, yCoord: 4 }
  
  expect(isBlowRow(harpRowPropsBlow)).toBeTruthy()
  expect(isBlowRow(harpRowPropsDraw)).toBeFalsy()
  expect(isBlowRow(harpRowPropsBend)).toBeFalsy()
})

test('isDrawRow returns true for a blow row and false otherwise', () => {
  const harpRowPropsBlow = { ...exampleHarpFaceProps, yCoord: 2 }
  const harpRowPropsDraw = { ...exampleHarpFaceProps, yCoord: 3 }
  const harpRowPropsBend = { ...exampleHarpFaceProps, yCoord: 4 }
  
  expect(isDrawRow(harpRowPropsBlow)).toBeFalsy()
  expect(isDrawRow(harpRowPropsDraw)).toBeTruthy()
  expect(isDrawRow(harpRowPropsBend)).toBeFalsy()
})

test('isBlowOrDrawRow returns true for a blow or draw row and false otherwise', () => {
  const harpRowPropsBlow = { ...exampleHarpFaceProps, yCoord: 2 }
  const harpRowPropsDraw = { ...exampleHarpFaceProps, yCoord: 3 }
  const harpRowPropsBend = { ...exampleHarpFaceProps, yCoord: 4 }
  
  expect(isBlowOrDrawRow(harpRowPropsBlow)).toBeTruthy()
  expect(isBlowOrDrawRow(harpRowPropsDraw)).toBeTruthy()
  expect(isBlowOrDrawRow(harpRowPropsBend)).toBeFalsy()
})
