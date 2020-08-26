import { EXAMPLE_STRATA } from '../../../HarpStrata'

import { getIsActiveComplex } from './index'

const {
  C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: {
    degreeMatrix,
    pitchMatrix,
    isActiveComplex,
  },
} = EXAMPLE_STRATA
const { activeDegreeIds, activePitchIds } = isActiveComplex

test('getIsActiveComplex returns the first pozition C major diatonic IsActiveComplex with C major pentatonic scale degrees active', () => {
  const isActiveProps = {
    degreeMatrix,
    pitchMatrix,
    activeIds: activeDegreeIds,
  }
  const actualIsActiveComplex = getIsActiveComplex(isActiveProps)
  const expectedIsActiveComplex = isActiveComplex

  expect(actualIsActiveComplex).toStrictEqual(expectedIsActiveComplex)
})

test('getIsActiveComplex returns the first pozition C major diatonic IsActiveComplex with C major pentatonic scale pitches active', () => {
  const isActiveProps = { degreeMatrix, pitchMatrix, activeIds: activePitchIds }
  const actualIsActiveComplex = getIsActiveComplex(isActiveProps)
  const expectedIsActiveComplex = isActiveComplex

  expect(actualIsActiveComplex).toStrictEqual(expectedIsActiveComplex)
})
