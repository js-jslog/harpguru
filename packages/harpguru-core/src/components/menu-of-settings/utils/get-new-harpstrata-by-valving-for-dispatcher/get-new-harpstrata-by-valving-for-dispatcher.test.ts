import { getHarpStrata } from 'harpstrata'
import { TuningIds, PitchIds, PozitionIds, ValvingIds } from 'harpparts'

import type { GlobalState } from '../../../../types'

import { getNewHarpStrataByValvingForDispatcher } from './get-new-harpstrata-by-valving-for-dispatcher'

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
  } as GlobalState
  const unusedDispatcher = jest.fn()

  const {
    activeHarpStrata: newActiveHarpStrata,
  } = getNewHarpStrataByValvingForDispatcher(
    inputGlobal,
    unusedDispatcher,
    ValvingIds.NotValved
  )

  expect(newActiveHarpStrata).toStrictEqual(unvalvedHarp)
})

test('provides HarpStrata updated to include valving', () => {
  const inputGlobal = {
    activeHarpStrata: unvalvedHarp,
  } as GlobalState
  const unusedDispatcher = jest.fn()

  const {
    activeHarpStrata: newActiveHarpStrata,
  } = getNewHarpStrataByValvingForDispatcher(
    inputGlobal,
    unusedDispatcher,
    ValvingIds.HalfValved
  )

  expect(newActiveHarpStrata).toStrictEqual(valvedHarp)
})
