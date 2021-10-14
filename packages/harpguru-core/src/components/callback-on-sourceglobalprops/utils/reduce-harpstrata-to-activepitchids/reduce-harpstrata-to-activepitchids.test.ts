import { PitchIds } from 'harpparts'

import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceHarpStrataToActivePitchIds } from './reduce-harpstrata-to-activepitchids'

test('the previous activePitchIds object is returned if it matches the one on the harpstrata', () => {
  const harpStrata = activeCellsHarpStrata
  const prevActivePitchIds = [...harpStrata.activePitchIds]
  const nextActivePitchIds = reduceHarpStrataToActivePitchIds(
    prevActivePitchIds,
    harpStrata
  )
  expect(nextActivePitchIds).toBe(prevActivePitchIds)
  expect(nextActivePitchIds).not.toBe(harpStrata.activePitchIds)
  expect(nextActivePitchIds).toStrictEqual(harpStrata.activePitchIds)
})

test('an activePitchIds is returned from a harpstrata if the previous activePitchIds is longer', () => {
  const harpStrata = activeCellsHarpStrata
  const prevActivePitchIds = [...harpStrata.activePitchIds, PitchIds.Gb]
  const nextActivePitchIds = reduceHarpStrataToActivePitchIds(
    prevActivePitchIds,
    harpStrata
  )
  expect(nextActivePitchIds).not.toBe(prevActivePitchIds)
  expect(nextActivePitchIds).not.toStrictEqual(prevActivePitchIds)
  expect(nextActivePitchIds).toStrictEqual(harpStrata.activePitchIds)
})

test('an activePitchIds is returned from a harpstrata if the previous activePitchIds is shorter', () => {
  const harpStrata = activeCellsHarpStrata
  const {
    activePitchIds: [, ...prevActivePitchIds],
  } = harpStrata
  const nextActivePitchIds = reduceHarpStrataToActivePitchIds(
    prevActivePitchIds,
    harpStrata
  )
  expect(nextActivePitchIds).not.toBe(prevActivePitchIds)
  expect(nextActivePitchIds).not.toStrictEqual(prevActivePitchIds)
  expect(nextActivePitchIds).toStrictEqual(harpStrata.activePitchIds)
})

test('an activePitchIds is returned from a harpstrata if the previous activePitchIds is reversed', () => {
  const harpStrata = activeCellsHarpStrata
  const { activePitchIds } = harpStrata
  const prevActivePitchIds = [...activePitchIds].reverse()
  const nextActivePitchIds = reduceHarpStrataToActivePitchIds(
    prevActivePitchIds,
    harpStrata
  )
  expect(nextActivePitchIds).not.toBe(prevActivePitchIds)
  expect(nextActivePitchIds).not.toStrictEqual(prevActivePitchIds)
  expect(nextActivePitchIds).toStrictEqual(harpStrata.activePitchIds)
})
