import { PitchIds, PozitionIds } from 'harpparts'

import { CovariantMembers } from '../../covariance-series-types'
import type {
  HarpKeyControllers,
  PozitionControllers,
  RootPitchControllers,
} from '../../../covariant-set'

import { getSeriesControllers } from './get-series-controllers'

test('can get a series of HarpKeyControllers with locked pozition', () => {
  const { Pozition: lockedType } = CovariantMembers
  const { RootPitch: variedType } = CovariantMembers
  const { First: lockedValue } = PozitionIds
  const { C: variedValue } = PitchIds

  const expectedControlVarsArray: ReadonlyArray<HarpKeyControllers> = [
    {
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.C,
    },
    {
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.Db,
    },
    {
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.D,
    },
    {
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.Eb,
    },
    {
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.E,
    },
    {
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.F,
    },
    {
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.Gb,
    },
    {
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.G,
    },
    {
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.Ab,
    },
    {
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.A,
    },
    {
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.Bb,
    },
    {
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.B,
    },
  ]

  const actualControlVarsArray = getSeriesControllers({
    lockedType,
    variedType,
    lockedValue,
    variedValue,
  })

  expect(actualControlVarsArray).toStrictEqual(expectedControlVarsArray)
})

test('can get a series of PozitionControllers with locked root pitch', () => {
  const { RootPitch: lockedType } = CovariantMembers
  const { HarpKey: variedType } = CovariantMembers
  const { Gb: lockedValue } = PitchIds
  const { F: variedValue } = PitchIds

  const expectedControlVarsArray: ReadonlyArray<PozitionControllers> = [
    {
      rootPitchId: PitchIds.Gb,
      harpKeyId: PitchIds.F,
    },
    {
      rootPitchId: PitchIds.Gb,
      harpKeyId: PitchIds.Gb,
    },
    {
      rootPitchId: PitchIds.Gb,
      harpKeyId: PitchIds.G,
    },
    {
      rootPitchId: PitchIds.Gb,
      harpKeyId: PitchIds.Ab,
    },
    {
      rootPitchId: PitchIds.Gb,
      harpKeyId: PitchIds.A,
    },
    {
      rootPitchId: PitchIds.Gb,
      harpKeyId: PitchIds.Bb,
    },
    {
      rootPitchId: PitchIds.Gb,
      harpKeyId: PitchIds.B,
    },
    {
      rootPitchId: PitchIds.Gb,
      harpKeyId: PitchIds.C,
    },
    {
      rootPitchId: PitchIds.Gb,
      harpKeyId: PitchIds.Db,
    },
    {
      rootPitchId: PitchIds.Gb,
      harpKeyId: PitchIds.D,
    },
    {
      rootPitchId: PitchIds.Gb,
      harpKeyId: PitchIds.Eb,
    },
    {
      rootPitchId: PitchIds.Gb,
      harpKeyId: PitchIds.E,
    },
  ]

  const actualControlVarsArray = getSeriesControllers({
    lockedType,
    variedType,
    lockedValue,
    variedValue,
  })

  expect(actualControlVarsArray).toStrictEqual(expectedControlVarsArray)
})

test('can get a series of RootPitchControllers with locked harp key', () => {
  const { HarpKey: lockedType } = CovariantMembers
  const { Pozition: variedType } = CovariantMembers
  const { B: lockedValue } = PitchIds
  const { Eighth: variedValue } = PozitionIds

  const expectedControlVarsArray: ReadonlyArray<RootPitchControllers> = [
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.Eighth,
    },
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.Ninth,
    },
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.Tenth,
    },
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.Eleventh,
    },
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.Twelfth,
    },
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.First,
    },
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.Second,
    },
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.Third,
    },
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.Fourth,
    },
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.Fifth,
    },
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.Sixth,
    },
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.Seventh,
    },
  ]

  const actualControlVarsArray = getSeriesControllers({
    lockedType,
    variedType,
    lockedValue,
    variedValue,
  })

  expect(actualControlVarsArray).toStrictEqual(expectedControlVarsArray)
})
