import { exampleHarpFaceProps } from '../HarpFace'

import { getHarpCells } from './index'

test('getHarpCells returns an array of HarpCells, the length of the row', () => {
  const rowIndex = 0
  const harpCells = getHarpCells(exampleHarpFaceProps, rowIndex)
  expect(harpCells.length).toBe(10)
})
