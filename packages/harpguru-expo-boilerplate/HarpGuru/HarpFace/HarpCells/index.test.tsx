import type { HarpRowProps } from '../HarpRow'
import { exampleHarpFaceProps } from '../HarpFace'

import { getHarpCells } from './index'

test('getHarpCells returns an array of HarpCells, the length of the row', () => {
  const harpRowProps: HarpRowProps = { ...exampleHarpFaceProps, yCoord: 0 }
  const harpCells = getHarpCells(harpRowProps)
  expect(harpCells.length).toBe(10)
})
