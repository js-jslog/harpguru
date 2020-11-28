import { getDegree, DegreeIds, PitchIds, getPitch } from 'harpparts'

import type { IsActiveProps } from '../../../types'

import {
  getCounterpartDegreeIds,
  getCounterpartPitchIds,
} from './get-counterpart-active-ids'

const c = getPitch(PitchIds.C)
const d = getPitch(PitchIds.D)
const e = getPitch(PitchIds.E)
const f = getPitch(PitchIds.F)

const root = getDegree(DegreeIds.Root)
const second = getDegree(DegreeIds.Second)
const third = getDegree(DegreeIds.Third)
const fourth = getDegree(DegreeIds.Fourth)

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

test('getCounterpartDegreeIds returns the ActiveDegreeIds for a given ActivePitchIds', () => {
  const isActiveProps = {
    ...baseIsActiveProps,
    activeIds: [PitchIds.D, PitchIds.E],
  }
  const expectedCounterpartIds = [DegreeIds.Second, DegreeIds.Third]
  const actualCounterpartIds = getCounterpartDegreeIds(isActiveProps)

  expect(actualCounterpartIds).toStrictEqual(expectedCounterpartIds)
})

test('getCounterpartPitchIds returns the ActivePitchIds for a given ActiveDegreeIds', () => {
  const isActiveProps = {
    ...baseIsActiveProps,
    activeIds: [DegreeIds.Second, DegreeIds.Third],
  }
  const expectedCounterpartIds = [PitchIds.D, PitchIds.E]
  const actualCounterpartIds = getCounterpartPitchIds(isActiveProps)

  expect(actualCounterpartIds).toStrictEqual(expectedCounterpartIds)
})
