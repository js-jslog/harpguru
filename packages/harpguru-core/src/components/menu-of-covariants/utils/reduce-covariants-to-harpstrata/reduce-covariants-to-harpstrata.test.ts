import { getHarpStrata } from 'harpstrata'
import { TuningIds, PitchIds, PozitionIds, ValvingIds } from 'harpparts'

import { DisplayModes } from '../../../../types'

import { reduceCovariantsToHarpStrata } from './reduce-covariants-to-harpstrata'

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
  const activeHarpStrata = cHarpFirstPozition
  const { Degree: activeDisplayMode } = DisplayModes
  const partialHarpStrataProps = {
    harpKeyId: PitchIds.C,
    pozitionId: PozitionIds.Second,
  }

  const newActiveHarpStrata = reduceCovariantsToHarpStrata(
    activeHarpStrata,
    activeDisplayMode,
    partialHarpStrataProps
  )

  expect(newActiveHarpStrata).toStrictEqual(cHarpSecondPozition)
})

test('provides HarpStrata with different HarpKey & Pozition', () => {
  const activeHarpStrata = cHarpFirstPozition
  const { Degree: activeDisplayMode } = DisplayModes
  const partialHarpStrataProps = {
    harpKeyId: PitchIds.D,
    pozitionId: PozitionIds.Second,
  }

  const newActiveHarpStrata = reduceCovariantsToHarpStrata(
    activeHarpStrata,
    activeDisplayMode,
    partialHarpStrataProps
  )

  expect(newActiveHarpStrata).toStrictEqual(dHarpSecondPozition)
})
