import { ApparatusIds, PozitionIds, PitchIds, getHarpStrata } from 'harpstrata'

import { DisplayModes } from '../../../../types'

import { nudgeHarpStrataByRootPitch } from './index'

const baseHarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const cHarpFirstPozitionProps = baseHarpStrataProps
// Eigth position puts the root a semi tone higher than in First
const cHarpEighthPozitionProps = {
  ...baseHarpStrataProps,
  pozitionId: PozitionIds.Eighth,
}

const cHarpFirstPozition = getHarpStrata(cHarpFirstPozitionProps)
const cHarpEighthPozition = getHarpStrata(cHarpEighthPozitionProps)

test('provides incremented HarpStrata by root pitch along with pozition id id', () => {
  const setActiveHarpStrata = jest.fn()
  const partialParams = {
    activeHarpStrata: cHarpFirstPozition,
    setActiveHarpStrata,
    activeDisplayMode: DisplayModes.Degree,
  }
  nudgeHarpStrataByRootPitch(partialParams, 'UP')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    cHarpEighthPozition
  )
})

test('provides decremented HarpStrata by root pitch along with pozition id id', () => {
  const setActiveHarpStrata = jest.fn()
  const partialParams = {
    activeHarpStrata: cHarpEighthPozition,
    setActiveHarpStrata,
    activeDisplayMode: DisplayModes.Degree,
  }
  nudgeHarpStrataByRootPitch(partialParams, 'DOWN')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})
