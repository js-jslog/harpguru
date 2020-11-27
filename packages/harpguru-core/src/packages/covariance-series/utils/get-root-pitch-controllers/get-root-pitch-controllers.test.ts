import type { RootPitchControllers } from 'harpstrata'
import { PitchIds, PozitionIds } from 'harpparts'

import { CovariantMembers } from '../../covariance-series-types'

import { getRootPitchControllers } from './get-root-pitch-controllers'

test('getRootPitchControllers returns a RootPitchControllers for a locked harp key', () => {
  const { HarpKey: lockedType } = CovariantMembers
  const { Pozition: variedType } = CovariantMembers
  const { D: lockedValue } = PitchIds
  const { Second: variedValue } = PozitionIds

  const expectedControlVars: RootPitchControllers = {
    harpKeyId: PitchIds.D,
    pozitionId: PozitionIds.Second,
  }

  const actualControlVars = getRootPitchControllers({
    lockedType,
    variedType,
    lockedValue,
    variedValue,
  })

  expect(actualControlVars).toEqual(expectedControlVars)
})

test('getRootPitchControllers returns a RootPitchControllers for a locked root pitch', () => {
  const { Pozition: lockedType } = CovariantMembers
  const { HarpKey: variedType } = CovariantMembers
  const { Eighth: lockedValue } = PozitionIds
  const { A: variedValue } = PitchIds

  const expectedControlVars: RootPitchControllers = {
    harpKeyId: PitchIds.A,
    pozitionId: PozitionIds.Eighth,
  }

  const actualControlVars = getRootPitchControllers({
    lockedType,
    variedType,
    lockedValue,
    variedValue,
  })

  expect(actualControlVars).toEqual(expectedControlVars)
})
