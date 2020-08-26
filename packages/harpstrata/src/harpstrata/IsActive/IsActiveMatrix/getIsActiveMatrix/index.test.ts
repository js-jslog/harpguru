import { IsActiveIds } from '../types'
import type { IsActiveProps } from '../../types'
import { PitchIds, getPitch } from '../../../Pitch'
import { EXAMPLE_STRATA } from '../../../HarpStrata'
import { DegreeIds, getDegree } from '../../../Degree'

const c = getPitch(PitchIds.C)
const d = getPitch(PitchIds.D)
const e = getPitch(PitchIds.E)
const f = getPitch(PitchIds.F)

const root = getDegree(DegreeIds.Root)
const second = getDegree(DegreeIds.Second)
const third = getDegree(DegreeIds.Third)
const fourth = getDegree(DegreeIds.Fourth)

import { getIsActiveMatrix } from './index'

const degreeMatrix = [
  [root, second],
  [third, fourth],
]
const pitchMatrix = [
  [c, d],
  [e, f],
]
const baseIsActiveProps: IsActiveProps = {
  degreeMatrix,
  pitchMatrix,
  activeIds: [],
}

test('getIsActiveMatrix returns the IsActiveMatrix when given an empty list of ActiveIds', () => {
  const expectedIsActiveMatrix = [
    [IsActiveIds.Inactive, IsActiveIds.Inactive],
    [IsActiveIds.Inactive, IsActiveIds.Inactive],
  ]
  const actualIsActiveMatrix = getIsActiveMatrix(baseIsActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(expectedIsActiveMatrix)
})

test('getIsActiveMatrix returns the IsActiveMatrix when given ActiveDegreeIds', () => {
  const isActiveProps = {
    ...baseIsActiveProps,
    activeIds: [DegreeIds.Root, DegreeIds.Fourth],
  }
  const expectedIsActiveMatrix = [
    [IsActiveIds.Active, IsActiveIds.Inactive],
    [IsActiveIds.Inactive, IsActiveIds.Active],
  ]
  const actualIsActiveMatrix = getIsActiveMatrix(isActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(expectedIsActiveMatrix)
})

test('getIsActiveMatrix returns the IsActiveMatrix when given ActivePitchIds', () => {
  const isActiveProps = {
    ...baseIsActiveProps,
    activeIds: [PitchIds.D, PitchIds.E],
  }
  const expectedIsActiveMatrix = [
    [IsActiveIds.Inactive, IsActiveIds.Active],
    [IsActiveIds.Active, IsActiveIds.Inactive],
  ]
  const actualIsActiveMatrix = getIsActiveMatrix(isActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(expectedIsActiveMatrix)
})

test('getIsActiveMatrix returns the IsActiveMatrix including undefined when given ActivePitchIds', () => {
  const degreeMatrix = [
    [undefined, second],
    [third, fourth],
  ]
  const pitchMatrix = [
    [undefined, d],
    [e, f],
  ]
  const isActiveProps = {
    degreeMatrix,
    pitchMatrix,
    activeIds: [PitchIds.D, PitchIds.E],
  }
  const expectedIsActiveMatrix = [
    [undefined, IsActiveIds.Active],
    [IsActiveIds.Active, IsActiveIds.Inactive],
  ]
  const actualIsActiveMatrix = getIsActiveMatrix(isActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(expectedIsActiveMatrix)
})

test('getIsActiveMatrix returns the IsActiveMatrix when given ActiveDegreeIs against large element matrices', () => {
  const {
    C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: {
      degreeMatrix,
      pitchMatrix,
      isActiveComplex: {
        isActiveMatrix: exampleIsActiveMatrix,
        activeDegreeIds: exampleDegreeIds,
      },
    },
  } = EXAMPLE_STRATA

  const isActiveProps = {
    degreeMatrix,
    pitchMatrix,
    activeIds: exampleDegreeIds,
  }
  const actualIsActiveMatrix = getIsActiveMatrix(isActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(exampleIsActiveMatrix)
})

test('getIsActiveMatrix returns the IsActiveMatrix when given ActivePitchIs against large element matrices', () => {
  const {
    C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: {
      degreeMatrix,
      pitchMatrix,
      isActiveComplex: {
        isActiveMatrix: exampleIsActiveMatrix,
        activePitchIds: examplePitchIds,
      },
    },
  } = EXAMPLE_STRATA

  const isActiveProps = {
    degreeMatrix,
    pitchMatrix,
    activeIds: examplePitchIds,
  }
  const actualIsActiveMatrix = getIsActiveMatrix(isActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(exampleIsActiveMatrix)
})
