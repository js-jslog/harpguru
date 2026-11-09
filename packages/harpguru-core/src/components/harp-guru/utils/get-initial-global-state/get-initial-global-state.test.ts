import { getHarpStrata } from 'harpstrata'
import {
  TuningIds,
  ValvingIds,
  PozitionIds,
  PitchIds,
  DegreeIds,
} from 'harpparts'

import { DisplayModes } from '../../../../types'

import { getInitialGlobalState } from './get-initial-global-state'

test('Each page starts from its default when no setup is given', () => {
  const state = getInitialGlobalState(1)

  expect(state.tuningId).toBe(TuningIds.MajorDiatonic)
  expect(state.pozitionId).toBe(PozitionIds.Second)
  expect(state.harpKeyId).toBe(PitchIds.C)
  expect(state.activeDisplayMode).toBe(DisplayModes.Degree)
  expect(state.isCellInteractive).toBe(true)
  expect(state.frameDimensions).toBeUndefined()
})

test('A given setup is where the state starts, every derived field with it', () => {
  const harpStrataProps = {
    tuningId: TuningIds.PaddyRichter,
    valvingId: ValvingIds.HalfValved,
    pozitionId: PozitionIds.First,
    harpKeyId: PitchIds.D,
    activeIds: [DegreeIds.Root, DegreeIds.Third, DegreeIds.Fifth],
  }
  const state = getInitialGlobalState(1, {
    harpStrataProps,
    displayMode: DisplayModes.Pitch,
    isCellInteractive: false,
  })
  const expectedHarpStrata = getHarpStrata(harpStrataProps)

  expect(state.activeHarpStrata).toStrictEqual(expectedHarpStrata)
  expect(state.tuningId).toBe(TuningIds.PaddyRichter)
  expect(state.valvingId).toBe(ValvingIds.HalfValved)
  expect(state.pozitionId).toBe(PozitionIds.First)
  expect(state.harpKeyId).toBe(PitchIds.D)
  expect(state.rootPitchId).toBe(expectedHarpStrata.rootPitchId)
  expect(state.activeDegreeIds).toStrictEqual(
    expectedHarpStrata.activeDegreeIds
  )
  expect(state.activeInteractionMatrix).toStrictEqual(
    expectedHarpStrata.apparatus.interactionMatrix
  )
  expect(state.activeDisplayMode).toBe(DisplayModes.Pitch)
  expect(state.isCellInteractive).toBe(false)
})
