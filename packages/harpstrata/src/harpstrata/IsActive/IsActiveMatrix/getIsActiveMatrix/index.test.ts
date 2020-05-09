import { IsActiveIds } from '../types'
import type { IsActiveProps } from '../../types'
import { C, D, E, F, PitchIds } from '../../../Pitch'
import { EXAMPLE_STRATA } from '../../../HarpStrata'
import { ROOT, SECOND, THIRD, FOURTH, DegreeIds } from '../../../Degree'

import { getIsActiveMatrix } from './index'

const degreeMatrix = [
  [ ROOT , SECOND ],
  [ THIRD, FOURTH ],
]
const pitchMatrix = [
  [ C, D ],
  [ E, F ],
]
const baseIsActiveProps: IsActiveProps = {
  degreeMatrix, pitchMatrix, activeIds: []
}

test('getIsActiveMatrix returns the IsActiveMatrix when given an empty list of ActiveIds', () => {
  const expectedIsActiveMatrix = [
    [ IsActiveIds.Inactive, IsActiveIds.Inactive ],
    [ IsActiveIds.Inactive, IsActiveIds.Inactive ],
  ]
  const actualIsActiveMatrix = getIsActiveMatrix(baseIsActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(expectedIsActiveMatrix)
})

test('getIsActiveMatrix returns the IsActiveMatrix when given ActiveDegreeIds', () => {
  const isActiveProps = { ...baseIsActiveProps, activeIds: [ DegreeIds.Root, DegreeIds.Fourth ] }
  const expectedIsActiveMatrix = [
    [ IsActiveIds.Active  , IsActiveIds.Inactive ],
    [ IsActiveIds.Inactive, IsActiveIds.Active   ],
  ]
  const actualIsActiveMatrix = getIsActiveMatrix(isActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(expectedIsActiveMatrix)
})

test('getIsActiveMatrix returns the IsActiveMatrix when given ActivePitchIds', () => {
  const isActiveProps = { ...baseIsActiveProps, activeIds: [ PitchIds.D, PitchIds.E ] }
  const expectedIsActiveMatrix = [
    [ IsActiveIds.Inactive, IsActiveIds.Active   ],
    [ IsActiveIds.Active  , IsActiveIds.Inactive ],
  ]
  const actualIsActiveMatrix = getIsActiveMatrix(isActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(expectedIsActiveMatrix)
})

test('getIsActiveMatrix returns the IsActiveMatrix including undefined when given ActivePitchIds', () => {
  const degreeMatrix = [
    [ undefined, SECOND ],
    [ THIRD    , FOURTH ],
  ]
  const pitchMatrix = [
    [ undefined, D ],
    [ E        , F ],
  ]
  const isActiveProps = { degreeMatrix, pitchMatrix, activeIds: [ PitchIds.D, PitchIds.E ] }
  const expectedIsActiveMatrix = [
    [ undefined         , IsActiveIds.Active   ],
    [ IsActiveIds.Active, IsActiveIds.Inactive ],
  ]
  const actualIsActiveMatrix = getIsActiveMatrix(isActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(expectedIsActiveMatrix)
})

test('getIsActiveMatrix returns the IsActiveMatrix when given ActiveDegreeIs against large element matrices', () => {
  const { C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: {
    degreeMatrix,
    pitchMatrix,
    isActiveComplex: { isActiveMatrix: exampleIsActiveMatrix, activeDegreeIds: exampleDegreeIds }
  }} = EXAMPLE_STRATA

  const isActiveProps = { degreeMatrix, pitchMatrix, activeIds: exampleDegreeIds }
  const actualIsActiveMatrix = getIsActiveMatrix(isActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(exampleIsActiveMatrix)
})

test('getIsActiveMatrix returns the IsActiveMatrix when given ActivePitchIs against large element matrices', () => {
  const { C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: {
    degreeMatrix,
    pitchMatrix,
    isActiveComplex: { isActiveMatrix: exampleIsActiveMatrix, activePitchIds: examplePitchIds }
  }} = EXAMPLE_STRATA

  const isActiveProps = { degreeMatrix, pitchMatrix, activeIds: examplePitchIds }
  const actualIsActiveMatrix = getIsActiveMatrix(isActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(exampleIsActiveMatrix)
})
