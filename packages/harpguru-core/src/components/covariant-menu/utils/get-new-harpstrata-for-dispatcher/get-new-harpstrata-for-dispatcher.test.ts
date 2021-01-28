import { getHarpStrata } from 'harpstrata'
import { ApparatusIds, PitchIds, PozitionIds } from 'harpparts'

import type { GlobalState } from '../../../../types'

import { getNewHarpStrataForDispatcher } from './get-new-harpstrata-for-dispatcher'

const baseHarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
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
  } = getNewHarpStrataForDispatcher(
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
  } = getNewHarpStrataForDispatcher(
    inputGlobal,
    unusedDispatcher,
    partialHarpStrataProps
  )

  expect(newActiveHarpStrata).toStrictEqual(dHarpSecondPozition)
})
