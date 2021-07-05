import { getHarpStrata } from 'harpstrata'
import { TuningIds, PitchIds, PozitionIds, ValvingIds } from 'harpparts'

import type { GlobalState } from '../../../../types'

import { getNewHarpStrataByCovariantsForDispatcher } from './get-new-harpstrata-by-covariants-for-dispatcher'

const baseHarpStrataProps = {
  tuningId: TuningIds.Richter,
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
  } as GlobalState
  const unusedDispatcher = jest.fn()

  const partialHarpStrataProps = {
    harpKeyId: PitchIds.C,
    pozitionId: PozitionIds.Second,
  }

  const {
    activeHarpStrata: newActiveHarpStrata,
  } = getNewHarpStrataByCovariantsForDispatcher(
    inputGlobal,
    unusedDispatcher,
    partialHarpStrataProps
  )

  expect(newActiveHarpStrata).toStrictEqual(cHarpSecondPozition)
})

test('provides HarpStrata with different HarpKey & Pozition', () => {
  const inputGlobal = {
    activeHarpStrata: cHarpFirstPozition,
  } as GlobalState
  const unusedDispatcher = jest.fn()

  const partialHarpStrataProps = {
    harpKeyId: PitchIds.D,
    pozitionId: PozitionIds.Second,
  }

  const {
    activeHarpStrata: newActiveHarpStrata,
  } = getNewHarpStrataByCovariantsForDispatcher(
    inputGlobal,
    unusedDispatcher,
    partialHarpStrataProps
  )

  expect(newActiveHarpStrata).toStrictEqual(dHarpSecondPozition)
})
