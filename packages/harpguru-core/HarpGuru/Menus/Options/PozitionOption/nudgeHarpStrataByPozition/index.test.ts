import { ApparatusIds, PozitionIds, PitchIds, getHarpStrata } from 'harpstrata'

import { DisplayModes } from '../../../../HarpFace'

import { nudgeHarpStrataByPozition } from './index'

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

const cHarpFirstPozition = getHarpStrata(cHarpFirstPozitionProps)
const cHarpSecondPozition = getHarpStrata(cHarpSecondPozitionProps)

test('provides incremented HarpStrata by pozition along with root pitch id', () => {
  const setActiveHarpStrata = jest.fn()
  const partialParams = {
    activeHarpStrata: cHarpFirstPozition,
    setActiveHarpStrata,
    activeDisplayMode: DisplayModes.Degree,
  }
  nudgeHarpStrataByPozition(partialParams, 'UP')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    cHarpSecondPozition
  )
})

test('provides decremented HarpStrata by pozition along with root pitch id', () => {
  const setActiveHarpStrata = jest.fn()
  const partialParams = {
    activeHarpStrata: cHarpSecondPozition,
    setActiveHarpStrata,
    activeDisplayMode: DisplayModes.Degree,
  }
  nudgeHarpStrataByPozition(partialParams, 'DOWN')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})
