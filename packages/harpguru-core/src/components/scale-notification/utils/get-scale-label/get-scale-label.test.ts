import { DegreeIds, ScaleIds, getScale } from 'harpparts'

import { getScaleLabel } from './get-scale-label'

const { Root, Third, Fifth } = DegreeIds

test('an ordered match to be recognised', () => {
  const degreeIds = [Root, Third, Fifth]
  const { label: expectedScaleLabel } = getScale(ScaleIds.MajorTriad)
  expect(getScaleLabel(degreeIds)).toBe(expectedScaleLabel)
})

test('an unordered match to be recognised', () => {
  const degreeIds = [Third, Root, Fifth]
  const { label: expectedScaleLabel } = getScale(ScaleIds.MajorTriad)
  expect(getScaleLabel(degreeIds)).toBe(expectedScaleLabel)
})

test('a non-match to be unorecognised', () => {
  const degreeIds = [Root, Third]
  expect(getScaleLabel(degreeIds)).toBeUndefined()
})
