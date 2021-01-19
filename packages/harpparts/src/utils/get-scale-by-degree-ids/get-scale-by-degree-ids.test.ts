import { ScaleIds } from '../../scale'
import { DegreeIds } from '../../degree'
import { getScale } from '../../access-parts'

import { getScaleByDegreeIds } from './get-scale-by-degree-ids'

const { Root, Third, Fifth } = DegreeIds

test('an ordered match to be recognised', () => {
  const degreeIds = [Root, Third, Fifth]
  const expectedScale = getScale(ScaleIds.MajorTriad)
  const actualScale = getScaleByDegreeIds(degreeIds) || {}
  expect(actualScale).toBe(expectedScale)
})

test('an unordered match to be recognised', () => {
  const degreeIds = [Third, Root, Fifth]
  const expectedScale = getScale(ScaleIds.MajorTriad)
  const actualScale = getScaleByDegreeIds(degreeIds) || {}
  expect(actualScale).toBe(expectedScale)
})

test('a non-match to be unorecognised', () => {
  const degreeIds = [Root, Third]
  expect(getScaleByDegreeIds(degreeIds)).toBeUndefined()
})
