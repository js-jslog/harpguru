import type { IsActiveProps } from '../types'
import { EXAMPLE_STRATA } from '../../testResources'
import { C, D, E, F } from '../../Pitch/constants'
import { PitchIds } from '../../Pitch'
import { ROOT, SECOND, THIRD, FOURTH } from '../../Degree/constants'
import { DegreeIds } from '../../Degree'

import { ActiveIds, ActivePitchIds, ActiveDegreeIds } from './types'
import { getActiveIdsPair } from './index'


const basicDegreeMatrix = [
  [ ROOT , SECOND ],
  [ THIRD, FOURTH ],
]
const basicPitchMatrix = [
  [ C, D ],
  [ E, F ],
]
const baseIsActiveProps: IsActiveProps = {
  degreeMatrix: basicDegreeMatrix, pitchMatrix: basicPitchMatrix, activeIds: [] as ActiveIds
}

test('getActiveIdsPair returns the active ids for a given PitchIds[]', () => {
  const activePitchIds: ActiveIds = [ PitchIds.D, PitchIds.E ]
  const isActiveProps = { ...baseIsActiveProps, activeIds: activePitchIds }
  const expectedActiveIdsPair = {
    activeDegreeIds: [ DegreeIds.Second, DegreeIds.Third ] as ActiveDegreeIds,
    activePitchIds: activePitchIds as ActivePitchIds
  }
  const actualActiveIds = getActiveIdsPair(isActiveProps)

  expect(actualActiveIds).toStrictEqual(expectedActiveIdsPair)
})

test('getActiveIdsPair returns the active ids for a given DegreeIds[]', () => {
  const activeDegreeIds: ActiveIds = [ DegreeIds.Second, DegreeIds.Third ]
  const isActiveProps = { ...baseIsActiveProps, activeIds: activeDegreeIds }
  const expectedActiveIds = {
    activePitchIds: [ PitchIds.D, PitchIds.E ] as ActivePitchIds,
    activeDegreeIds: activeDegreeIds as ActiveDegreeIds }
  const actualActiveIds = getActiveIdsPair(isActiveProps)

  expect(actualActiveIds).toStrictEqual(expectedActiveIds)
})

const { C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: {
  degreeMatrix,
  pitchMatrix,
  isActiveComplex: { activePitchIds: examplePitchIds, activeDegreeIds: exampleDegreeIds }
}} = EXAMPLE_STRATA

test('getActiveIdsPair returns the active ids for a given PitchIds[]', () => {
  const isActiveProps = { degreeMatrix, pitchMatrix, activeIds: examplePitchIds as ActiveIds }
  const actualActiveIds = getActiveIdsPair(isActiveProps)
  const expectedActiveIds = {
    activePitchIds: examplePitchIds as ActivePitchIds,
    activeDegreeIds: exampleDegreeIds as ActiveDegreeIds,
  }

  expect(actualActiveIds).toEqual(expectedActiveIds)
})

test('getActiveIdsPair returns the active ids for a given DegreeIds[]', () => {
  const isActiveProps = { degreeMatrix, pitchMatrix, activeIds: exampleDegreeIds as ActiveIds }
  const actualActiveIds = getActiveIdsPair(isActiveProps)
  const expectedActiveIds = {
    activePitchIds: examplePitchIds as ActivePitchIds,
    activeDegreeIds: exampleDegreeIds as ActiveDegreeIds,
  }

  expect(actualActiveIds).toEqual(expectedActiveIds)
})
