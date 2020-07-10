import { PitchIds } from 'harpstrata'
import type { PozitionControllers } from 'harpstrata'

import { CovariantMembers } from '../types'

import { getPozitionControllers } from './index'

test('getPozitionControllers returns a PozitionControllers for a locked harp key', () => {
  const { HarpKey: lockedType } = CovariantMembers
  const { RootPitch: variedType } = CovariantMembers
  const { D: lockedValue } = PitchIds
  const { C: variedValue } = PitchIds

  const expectedControlVars: PozitionControllers = {
    harpKeyId: PitchIds.D,
    rootPitchId: PitchIds.C,
  }

  const actualControlVars = getPozitionControllers({
    lockedType,
    variedType,
    lockedValue,
    variedValue,
  })

  expect(actualControlVars).toEqual(expectedControlVars)
})

test('getPozitionControllers returns a PozitionControllers for a locked root pitch', () => {
  const { RootPitch: lockedType } = CovariantMembers
  const { HarpKey: variedType } = CovariantMembers
  const { Eb: lockedValue } = PitchIds
  const { A: variedValue } = PitchIds

  const expectedControlVars: PozitionControllers = {
    harpKeyId: PitchIds.A,
    rootPitchId: PitchIds.Eb,
  }

  const actualControlVars = getPozitionControllers({
    lockedType,
    variedType,
    lockedValue,
    variedValue,
  })

  expect(actualControlVars).toEqual(expectedControlVars)
})
