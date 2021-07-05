import { getDegree, DegreeIds, PitchIds, getPitch } from 'harpparts'

import { EXAMPLE_STRATA } from '../../testResources'
import { ActiveIds, ActivePitchIds, ActiveDegreeIds } from '../../../types'
import type { IsActiveProps } from '../../../types'

import { getActiveIdsPair } from './index'

const c = getPitch(PitchIds.C)
const d = getPitch(PitchIds.D)
const e = getPitch(PitchIds.E)
const f = getPitch(PitchIds.F)

const root = getDegree(DegreeIds.Root)
const second = getDegree(DegreeIds.Second)
const third = getDegree(DegreeIds.Third)
const fourth = getDegree(DegreeIds.Fourth)

const basicDegreeMatrix = [
  [root, second],
  [third, fourth],
]
const basicPitchMatrix = [
  [c, d],
  [e, f],
]
const baseIsActiveProps: IsActiveProps = {
  degreeMatrix: basicDegreeMatrix,
  pitchMatrix: basicPitchMatrix,
  activeIds: [] as ActiveIds,
}

test('getActiveIdsPair returns the active ids for a given PitchIds[]', () => {
  const activePitchIds: ActiveIds = [PitchIds.D, PitchIds.E]
  const isActiveProps = { ...baseIsActiveProps, activeIds: activePitchIds }
  const expectedActiveIdsPair = {
    activeDegreeIds: [DegreeIds.Second, DegreeIds.Third] as ActiveDegreeIds,
    activePitchIds: activePitchIds as ActivePitchIds,
  }
  const actualActiveIds = getActiveIdsPair(isActiveProps)

  expect(actualActiveIds).toStrictEqual(expectedActiveIdsPair)
})

test('getActiveIdsPair returns the active ids for a given DegreeIds[]', () => {
  const activeDegreeIds: ActiveIds = [DegreeIds.Second, DegreeIds.Third]
  const isActiveProps = { ...baseIsActiveProps, activeIds: activeDegreeIds }
  const expectedActiveIds = {
    activePitchIds: [PitchIds.D, PitchIds.E] as ActivePitchIds,
    activeDegreeIds: activeDegreeIds as ActiveDegreeIds,
  }
  const actualActiveIds = getActiveIdsPair(isActiveProps)

  expect(actualActiveIds).toStrictEqual(expectedActiveIds)
})

const {
  richter: {
    cHarp: {
      firstPozition: {
        notValved: {
          cMajorPentatonic: {
            harpStrata: {
              degreeMatrix,
              pitchMatrix,
              activeDegreeIds: exampleDegreeIds,
              activePitchIds: examplePitchIds,
            },
          },
        },
      },
    },
  },
} = EXAMPLE_STRATA

test('getActiveIdsPair returns the active ids for a given PitchIds[]', () => {
  const isActiveProps = {
    degreeMatrix,
    pitchMatrix,
    activeIds: examplePitchIds as ActiveIds,
  }
  const actualActiveIds = getActiveIdsPair(isActiveProps)
  const expectedActiveIds = {
    activePitchIds: examplePitchIds as ActivePitchIds,
    activeDegreeIds: exampleDegreeIds as ActiveDegreeIds,
  }

  expect(actualActiveIds).toEqual(expectedActiveIds)
})

test('getActiveIdsPair returns the active ids for a given DegreeIds[]', () => {
  const isActiveProps = {
    degreeMatrix,
    pitchMatrix,
    activeIds: exampleDegreeIds as ActiveIds,
  }
  const actualActiveIds = getActiveIdsPair(isActiveProps)
  const expectedActiveIds = {
    activePitchIds: examplePitchIds as ActivePitchIds,
    activeDegreeIds: exampleDegreeIds as ActiveDegreeIds,
  }

  expect(actualActiveIds).toEqual(expectedActiveIds)
})

test('getActiveIdsPair returns the active ids for a given Flat3 DegreeIds[]', () => {
  const isActiveProps = {
    degreeMatrix,
    pitchMatrix,
    activeIds: [DegreeIds.Flat3] as ActiveIds,
  }
  const actualActiveIds = getActiveIdsPair(isActiveProps)
  const expectedActiveIds = {
    activePitchIds: [PitchIds.Eb] as ActivePitchIds,
    activeDegreeIds: [DegreeIds.Flat3] as ActiveDegreeIds,
  }

  expect(actualActiveIds).toEqual(expectedActiveIds)
})
