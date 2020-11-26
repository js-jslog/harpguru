import { PitchIds } from 'harpstrata'
import type {
  HarpKeyControllers,
  PozitionControllers,
  RootPitchControllers,
} from 'harpstrata'
import { PozitionIds } from 'harpparts'

import { CovariantMembers } from '../../covariance-series-types'

import { getCovariantControllers } from './get-covariant-controllers'

test('getCovariantControllers returns a HarpKeyControllers for a locked pozition', () => {
  const { Pozition: lockedType } = CovariantMembers
  const { RootPitch: variedType } = CovariantMembers
  const { Second: lockedValue } = PozitionIds
  const { C: variedValue } = PitchIds

  const expectedControllers: HarpKeyControllers = {
    pozitionId: PozitionIds.Second,
    rootPitchId: PitchIds.C,
  }

  const actualControllers = getCovariantControllers({
    lockedType,
    variedType,
    lockedValue,
    variedValue,
  })

  expect(actualControllers).toEqual(expectedControllers)
})

test('getCovariantControllers returns a HarpKeyControllers for a locked root pitch', () => {
  const { RootPitch: lockedType } = CovariantMembers
  const { Pozition: variedType } = CovariantMembers
  const { Eb: lockedValue } = PitchIds
  const { Fourth: variedValue } = PozitionIds

  const expectedControllers: HarpKeyControllers = {
    pozitionId: PozitionIds.Fourth,
    rootPitchId: PitchIds.Eb,
  }

  const actualControllers = getCovariantControllers({
    lockedType,
    variedType,
    lockedValue,
    variedValue,
  })

  expect(actualControllers).toEqual(expectedControllers)
})

test('getCovariantControllers returns a PozitionControllers for a locked harp key', () => {
  const { HarpKey: lockedType } = CovariantMembers
  const { RootPitch: variedType } = CovariantMembers
  const { D: lockedValue } = PitchIds
  const { C: variedValue } = PitchIds

  const expectedControllers: PozitionControllers = {
    harpKeyId: PitchIds.D,
    rootPitchId: PitchIds.C,
  }

  const actualControllers = getCovariantControllers({
    lockedType,
    variedType,
    lockedValue,
    variedValue,
  })

  expect(actualControllers).toEqual(expectedControllers)
})

test('getCovariantControllers returns a PozitionControllers for a locked root pitch', () => {
  const { RootPitch: lockedType } = CovariantMembers
  const { HarpKey: variedType } = CovariantMembers
  const { Eb: lockedValue } = PitchIds
  const { A: variedValue } = PitchIds

  const expectedControllers: PozitionControllers = {
    harpKeyId: PitchIds.A,
    rootPitchId: PitchIds.Eb,
  }

  const actualControllers = getCovariantControllers({
    lockedType,
    variedType,
    lockedValue,
    variedValue,
  })

  expect(actualControllers).toEqual(expectedControllers)
})

test('getCovariantControllers returns a RootPitchControllers for a locked pozition', () => {
  const { Pozition: lockedType } = CovariantMembers
  const { HarpKey: variedType } = CovariantMembers
  const { Fifth: lockedValue } = PozitionIds
  const { A: variedValue } = PitchIds

  const expectedControllers: RootPitchControllers = {
    harpKeyId: PitchIds.A,
    pozitionId: PozitionIds.Fifth,
  }

  const actualControllers = getCovariantControllers({
    lockedType,
    variedType,
    lockedValue,
    variedValue,
  })

  expect(actualControllers).toEqual(expectedControllers)
})
