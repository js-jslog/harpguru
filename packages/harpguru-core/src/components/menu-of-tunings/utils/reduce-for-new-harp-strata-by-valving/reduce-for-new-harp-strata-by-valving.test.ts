import type { Dispatch } from 'reactn/default'
import { getHarpStrata } from 'harpstrata'
import type { ActiveDegreeIds, ActivePitchIds } from 'harpstrata'
import { TuningIds, PitchIds, PozitionIds, ValvingIds } from 'harpparts'

import type { GlobalState } from '../../../../types'

import { reduceForNewHarpStrataByValving } from './reduce-for-new-harp-strata-by-valving'

const baseHarpStrataProps = {
  tuningId: TuningIds.MajorDiatonic,
  valvingId: ValvingIds.NotValved,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const unvalvedHarpProps = baseHarpStrataProps
const valvedHarpProps = {
  ...baseHarpStrataProps,
  valvingId: ValvingIds.HalfValved,
}

const unvalvedHarp = getHarpStrata(unvalvedHarpProps)
const valvedHarp = getHarpStrata(valvedHarpProps)

test('provides HarpStrata updated to exclude valving', () => {
  const inputGlobal = {
    activeHarpStrata: valvedHarp,
    columnBounds: 'FIT',
    activeDegreeMatrix: valvedHarp.degreeMatrix,
    activePitchMatrix: valvedHarp.pitchMatrix,
    activeDegreeIds: [] as ActiveDegreeIds,
    activePitchIds: [] as ActivePitchIds,
    viewableDegreeMatrix: valvedHarp.degreeMatrix,
    viewablePitchMatrix: valvedHarp.pitchMatrix,
    layoutFacts: { harpfaceColumns: 10, harpfaceRows: 7 },
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch

  const {
    activeHarpStrata: newActiveHarpStrata,
  } = reduceForNewHarpStrataByValving(
    inputGlobal,
    unusedDispatcher,
    ValvingIds.NotValved
  )

  expect(newActiveHarpStrata).toStrictEqual(unvalvedHarp)
})

test('provides HarpStrata updated to include valving', () => {
  const inputGlobal = {
    activeHarpStrata: unvalvedHarp,
    columnBounds: 'FIT',
    activeDegreeMatrix: unvalvedHarp.degreeMatrix,
    activePitchMatrix: unvalvedHarp.pitchMatrix,
    activeDegreeIds: [] as ActiveDegreeIds,
    activePitchIds: [] as ActivePitchIds,
    viewableDegreeMatrix: valvedHarp.degreeMatrix,
    viewablePitchMatrix: valvedHarp.pitchMatrix,
    layoutFacts: { harpfaceColumns: 10, harpfaceRows: 7 },
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch

  const {
    activeHarpStrata: newActiveHarpStrata,
  } = reduceForNewHarpStrataByValving(
    inputGlobal,
    unusedDispatcher,
    ValvingIds.HalfValved
  )

  expect(newActiveHarpStrata).toStrictEqual(valvedHarp)
})
