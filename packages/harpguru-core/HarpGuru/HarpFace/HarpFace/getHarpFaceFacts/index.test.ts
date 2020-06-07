import { harpFaceProps } from '../../testResources'

import { getHarpFaceFacts } from './index'

test('Recovers the column and row count from the HarpFaceProps', () => {
  const harpFaceFacts = getHarpFaceFacts(harpFaceProps)

  const { columnCount, rowCount } = harpFaceFacts

  expect(columnCount).toBe(10)
  expect(rowCount).toBe(7)
})

test('Recovers the column and row count from the HarpFaceProps for a harp with a different number of rows and columns', () => {
  const { activeHarpStrata } = harpFaceProps
  const tamperedDegreeMatrix = [[ undefined, undefined ]]

  const tamperedHarpStrata = { ...activeHarpStrata, degreeMatrix: tamperedDegreeMatrix }
  const tamperedHarpFaceProps = { ...harpFaceProps, activeHarpStrata: tamperedHarpStrata }

  const harpFaceFacts = getHarpFaceFacts(tamperedHarpFaceProps)

  const { columnCount, rowCount } = harpFaceFacts

  expect(columnCount).toBe(2)
  expect(rowCount).toBe(1)
})
