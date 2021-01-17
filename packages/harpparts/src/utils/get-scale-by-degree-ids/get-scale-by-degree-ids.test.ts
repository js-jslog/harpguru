import { ScaleIds } from '../../scale'
import { DegreeIds } from '../../degree'
import { getScale } from '../../access-parts'

import { getScaleByDegreeIds } from './get-scale-by-degree-ids'

const { Root, Third, Fifth } = DegreeIds

test('an ordered match to be recognised', () => {
  const degreeIds = [Root, Third, Fifth]
  const { label: expectedScaleLabel } = getScale(ScaleIds.MajorTriad)
  expect(getScaleByDegreeIds(degreeIds)).toBe(expectedScaleLabel)
})

test('an unordered match to be recognised', () => {
  const degreeIds = [Third, Root, Fifth]
  const { label: expectedScaleLabel } = getScale(ScaleIds.MajorTriad)
  expect(getScaleByDegreeIds(degreeIds)).toBe(expectedScaleLabel)
})

test('a non-match to be unorecognised', () => {
  const degreeIds = [Root, Third]
  expect(getScaleByDegreeIds(degreeIds)).toBeUndefined()
})
