import type { Dispatch } from 'reactn/default'
import { getHarpStrata } from 'harpstrata'
import { TuningIds, PitchIds, PozitionIds, ValvingIds } from 'harpparts'

import type { GlobalState } from '../../../../types'

import { reduceForNewHarpStrataByCovariants } from './reduce-for-new-harp-strata-by-covariants'

const baseHarpStrataProps = {
  tuningId: TuningIds.MajorDiatonic,
  valvingId: ValvingIds.NotValved,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const cHarpFirstPozitionProps = baseHarpStrataProps
const cHarpSecondPozitionProps = {
  ...baseHarpStrataProps,
  pozitionId: PozitionIds.Second,
}
const dHarpSecondPozitionProps = {
  ...baseHarpStrataProps,
  harpKeyId: PitchIds.D,
  pozitionId: PozitionIds.Second,
}

const cHarpFirstPozition = getHarpStrata(cHarpFirstPozitionProps)
const cHarpSecondPozition = getHarpStrata(cHarpSecondPozitionProps)
const dHarpSecondPozition = getHarpStrata(dHarpSecondPozitionProps)

test('provides HarpStrata with different Pozition', () => {
  const inputGlobal = {
    activeHarpStrata: cHarpFirstPozition,
    columnBounds: 'FIT',
    activeDegreeMatrix: cHarpFirstPozition.degreeMatrix,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch

  const partialHarpStrataProps = {
    harpKeyId: PitchIds.C,
    pozitionId: PozitionIds.Second,
  }

  const {
    activeHarpStrata: newActiveHarpStrata,
  } = reduceForNewHarpStrataByCovariants(
    inputGlobal,
    unusedDispatcher,
    partialHarpStrataProps
  )

  expect(newActiveHarpStrata).toStrictEqual(cHarpSecondPozition)
})

test('provides HarpStrata with different HarpKey & Pozition', () => {
  const inputGlobal = {
    activeHarpStrata: cHarpFirstPozition,
    columnBounds: 'FIT',
    activeDegreeMatrix: cHarpFirstPozition.degreeMatrix,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch

  const partialHarpStrataProps = {
    harpKeyId: PitchIds.D,
    pozitionId: PozitionIds.Second,
  }

  const {
    activeHarpStrata: newActiveHarpStrata,
  } = reduceForNewHarpStrataByCovariants(
    inputGlobal,
    unusedDispatcher,
    partialHarpStrataProps
  )

  expect(newActiveHarpStrata).toStrictEqual(dHarpSecondPozition)
})
