import { exampleHarpFaceProps } from '../testResources'

import { getHarpFaceFacts } from './index'

test('Recovers the column and row count from the HarpFaceProps', () => {
  const harpFaceFacts = getHarpFaceFacts(exampleHarpFaceProps)

  const { columnCount, rowCount } = harpFaceFacts

  expect(columnCount).toBe(10)
  expect(rowCount).toBe(7)
})

test('Recovers the column and row count from the HarpFaceProps for a harp with a different number of rows and columns', () => {
  const { activeHarpStrata } = exampleHarpFaceProps
  const tamperedDegreeMatrix = [[ undefined, undefined ]]

  const tamperedHarpStrata = { ...activeHarpStrata, degreeMatrix: tamperedDegreeMatrix }
  const tamperedHarpFaceProps = { ...exampleHarpFaceProps, activeHarpStrata: tamperedHarpStrata }

  const harpFaceFacts = getHarpFaceFacts(tamperedHarpFaceProps)

  const { columnCount, rowCount } = harpFaceFacts

  expect(columnCount).toBe(2)
  expect(rowCount).toBe(1)
})
