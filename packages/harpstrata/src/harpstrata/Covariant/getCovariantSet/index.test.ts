import { PozitionIds } from 'harpparts'

import type {
  HarpKeyControllers,
  RootPitchControllers,
  PozitionControllers,
} from '../types'
import { PitchIds } from '../../Pitch'

import { getCovariantSet } from './index'

test('getCovariantSet returns the root pitch along with the input controller members of the set', () => {
  const { C: harpKeyId } = PitchIds
  const { Fourth: pozitionId } = PozitionIds
  const rootPitchControllers: RootPitchControllers = { harpKeyId, pozitionId }

  const expectedCovariantSet = {
    harpKeyId,
    pozitionId,
    rootPitchId: PitchIds.A,
  }
  const actualCovariantSet = getCovariantSet(rootPitchControllers)

  expect(actualCovariantSet).toStrictEqual(expectedCovariantSet)
})

test('getCovariantSet returns the harp key along with the input controller members of the set', () => {
  const { Bb: rootPitchId } = PitchIds
  const { Ninth: pozitionId } = PozitionIds
  const harpKeyControllers: HarpKeyControllers = { rootPitchId, pozitionId }

  const expectedCovariantSet = {
    rootPitchId,
    pozitionId,
    harpKeyId: PitchIds.D,
  }
  const actualCovariantSet = getCovariantSet(harpKeyControllers)

  expect(actualCovariantSet).toStrictEqual(expectedCovariantSet)
})

test('getCovariantSet returns the pozition along with the input controller members of the set', () => {
  const { F: rootPitchId } = PitchIds
  const { C: harpKeyId } = PitchIds
  const pozitionIdControllers: PozitionControllers = { rootPitchId, harpKeyId }

  const expectedCovariantSet = {
    rootPitchId,
    harpKeyId,
    pozitionId: PozitionIds.Twelfth,
  }
  const actualCovariantSet = getCovariantSet(pozitionIdControllers)

  expect(actualCovariantSet).toStrictEqual(expectedCovariantSet)
})
