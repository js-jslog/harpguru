import { EXAMPLE_STRATA } from '../../../HarpStrata'

import { getIsActiveComplex } from './index'

const {
  C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: {
    degreeMatrix,
    pitchMatrix,
    activeDegreeIds,
    activePitchIds,
  },
} = EXAMPLE_STRATA

test('getIsActiveComplex returns the first pozition C major diatonic IsActiveComplex with C major pentatonic scale degrees active', () => {
  const isActiveProps = {
    degreeMatrix,
    pitchMatrix,
    activeIds: activeDegreeIds,
  }
  const {
    activeDegreeIds: actualActiveDegreeIds,
    activePitchIds: actualActivePitchIds,
  } = getIsActiveComplex(isActiveProps)
  const expectedActiveDegreeIds = activeDegreeIds
  const expectedActivePitchIds = activePitchIds

  expect(actualActiveDegreeIds).toStrictEqual(expectedActiveDegreeIds)
  expect(actualActivePitchIds).toStrictEqual(expectedActivePitchIds)
})

test('getIsActiveComplex returns the first pozition C major diatonic IsActiveComplex with C major pentatonic scale pitches active', () => {
  const isActiveProps = { degreeMatrix, pitchMatrix, activeIds: activePitchIds }
  const {
    activeDegreeIds: actualActiveDegreeIds,
    activePitchIds: actualActivePitchIds,
  } = getIsActiveComplex(isActiveProps)
  const expectedActiveDegreeIds = activeDegreeIds
  const expectedActivePitchIds = activePitchIds

  expect(actualActiveDegreeIds).toStrictEqual(expectedActiveDegreeIds)
  expect(actualActivePitchIds).toStrictEqual(expectedActivePitchIds)
})
