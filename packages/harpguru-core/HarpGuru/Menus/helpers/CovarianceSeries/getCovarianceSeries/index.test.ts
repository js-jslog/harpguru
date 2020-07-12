import { PitchIds, PozitionIds } from 'harpstrata'

import { CovarianceSeries, CovariancePrimer, CovariantMembers } from '../types'

import { getCovarianceSeries } from './index'

test('getCovarianceSeries returns a complete series of CovariantSets for an origin primer', () => {
  const covarianceOriginPrimer: CovariancePrimer = {
    lockedType: CovariantMembers.Pozition,
    variedType: CovariantMembers.HarpKey,
    lockedValue: PozitionIds.First,
    variedValue: PitchIds.C,
  }

  const expectedCovarianceSeries: CovarianceSeries = [
    {
      harpKeyId: PitchIds.C,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.C,
    },
    {
      harpKeyId: PitchIds.Db,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.Db,
    },
    {
      harpKeyId: PitchIds.D,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.D,
    },
    {
      harpKeyId: PitchIds.Eb,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.Eb,
    },
    {
      harpKeyId: PitchIds.E,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.E,
    },
    {
      harpKeyId: PitchIds.F,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.F,
    },
    {
      harpKeyId: PitchIds.Gb,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.Gb,
    },
    {
      harpKeyId: PitchIds.G,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.G,
    },
    {
      harpKeyId: PitchIds.Ab,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.Ab,
    },
    {
      harpKeyId: PitchIds.A,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.A,
    },
    {
      harpKeyId: PitchIds.Bb,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.Bb,
    },
    {
      harpKeyId: PitchIds.B,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.B,
    },
  ]

  const actualCovarianceSeries = getCovarianceSeries(covarianceOriginPrimer)

  expect(actualCovarianceSeries).toStrictEqual(expectedCovarianceSeries)
})

test('getCovarianceSeries returns a series of CovariantSets for a different origin primer', () => {
  const covarianceOriginPrimer: CovariancePrimer = {
    lockedType: CovariantMembers.RootPitch,
    variedType: CovariantMembers.HarpKey,
    lockedValue: PitchIds.G,
    variedValue: PitchIds.G,
  }

  const expectedSeriesIncludes = [
    {
      harpKeyId: PitchIds.G,
      pozitionId: PozitionIds.First,
      rootPitchId: PitchIds.G,
    },
    {
      harpKeyId: PitchIds.C,
      pozitionId: PozitionIds.Second,
      rootPitchId: PitchIds.G,
    },
  ]

  const actualCovarianceSeries = getCovarianceSeries(covarianceOriginPrimer)

  expect(actualCovarianceSeries).toEqual(
    expect.arrayContaining(expectedSeriesIncludes)
  )
})

test('getCovarianceSeries returns a series of CovariantSets for yet another different origin primer', () => {
  const covarianceOriginPrimer: CovariancePrimer = {
    lockedType: CovariantMembers.RootPitch,
    variedType: CovariantMembers.Pozition,
    lockedValue: PitchIds.G,
    variedValue: PozitionIds.Seventh,
  }

  const expectedSeriesIncludes = [
    {
      harpKeyId: PitchIds.Db,
      pozitionId: PozitionIds.Seventh,
      rootPitchId: PitchIds.G,
    },
    {
      harpKeyId: PitchIds.F,
      pozitionId: PozitionIds.Third,
      rootPitchId: PitchIds.G,
    },
  ]

  const actualCovarianceSeries = getCovarianceSeries(covarianceOriginPrimer)

  expect(actualCovarianceSeries).toEqual(
    expect.arrayContaining(expectedSeriesIncludes)
  )
})

test('getCovarianceSeries returns a series of CovariantSets for yet again another different origin primer', () => {
  const covarianceOriginPrimer: CovariancePrimer = {
    lockedType: CovariantMembers.Pozition,
    variedType: CovariantMembers.RootPitch,
    lockedValue: PozitionIds.Fourth,
    variedValue: PitchIds.Bb,
  }

  const expectedSeriesIncludes = [
    {
      harpKeyId: PitchIds.Db,
      pozitionId: PozitionIds.Fourth,
      rootPitchId: PitchIds.Bb,
    },
    {
      harpKeyId: PitchIds.G,
      pozitionId: PozitionIds.Fourth,
      rootPitchId: PitchIds.E,
    },
  ]

  const actualCovarianceSeries = getCovarianceSeries(covarianceOriginPrimer)

  expect(actualCovarianceSeries).toEqual(
    expect.arrayContaining(expectedSeriesIncludes)
  )
})
