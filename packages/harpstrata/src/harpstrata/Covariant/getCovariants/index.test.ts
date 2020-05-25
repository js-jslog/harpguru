import type { HarpKeyControlVars, RootPitchControlVars, PozitionControlVars } from '../types'
import { PozitionIds } from '../../Pozition'
import { PitchIds } from '../../Pitch'

import { getCovariants } from './index'

test('getCovariants returns the root pitch along with input harp key and pozition id control variables', () => {
  const { C: harpKeyId } = PitchIds
  const { Fourth: pozitionId } = PozitionIds
  const rootPitchControlProps: RootPitchControlVars = { harpKeyId, pozitionId }

  const expectedCovariants = { harpKeyId, pozitionId, rootPitchId: PitchIds.A }
  const actualCovariants = getCovariants(rootPitchControlProps)

  expect(actualCovariants).toEqual(expectedCovariants)
})

test('getCovariants returns the harp key along with input root pitch and pozition id control variables', () => {
  const { Bb: rootPitchId } = PitchIds
  const { Ninth: pozitionId } = PozitionIds
  const harpKeyControlProps: HarpKeyControlVars = { rootPitchId, pozitionId }

  const expectedCovariants = { rootPitchId, pozitionId, harpKeyId: PitchIds.D }
  const actualCovariants = getCovariants(harpKeyControlProps)

  expect(actualCovariants).toEqual(expectedCovariants)
})

test('getCovariants returns the pozition along with input root pitch and harp key id control variables', () => {
  const { F: rootPitchId } = PitchIds
  const { C: harpKeyId } = PitchIds
  const pozitionIdControlProps: PozitionControlVars = { rootPitchId, harpKeyId }

  const expectedCovariants = { rootPitchId, harpKeyId, pozitionId: PozitionIds.Twelfth }
  const actualCovariants = getCovariants(pozitionIdControlProps)

  expect(actualCovariants).toEqual(expectedCovariants)
})
