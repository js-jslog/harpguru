import {ApparatusIds, PozitionIds, PitchIds, getHarpStrata} from 'harpstrata'

import {DisplayModes} from '../../../../HarpFace'

import { nudgeHarpStrataByHarpKey } from './index'

const baseHarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const cHarpFirstPozitionProps = baseHarpStrataProps
// Sixth position puts the root a semi tone lower than in First which is whats required to keep it the same while incrementing the harp key
const dbHarpFirstPozitionProps = { ...baseHarpStrataProps, harpKeyId: PitchIds.Db, pozitionId: PozitionIds.Sixth }

const cHarpFirstPozition = getHarpStrata(cHarpFirstPozitionProps)
const dbHarpFirstPozition = getHarpStrata(dbHarpFirstPozitionProps)

test('provides incremented HarpStrata by harp key along with pozition id', () => {
  const setActiveHarpStrata = jest.fn()
  const partialParams = {
    activeHarpStrata: cHarpFirstPozition,
    setActiveHarpStrata,
    activeDisplayMode: DisplayModes.Degree
  }
  nudgeHarpStrataByHarpKey(partialParams, 'UP')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(dbHarpFirstPozition)
})

test('provides decremented HarpStrata by harp key along with pozition id', () => {
  const setActiveHarpStrata = jest.fn()
  const partialParams = {
    activeHarpStrata: dbHarpFirstPozition,
    setActiveHarpStrata,
    activeDisplayMode: DisplayModes.Degree
  }
  nudgeHarpStrataByHarpKey(partialParams, 'DOWN')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})
