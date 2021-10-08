import { DegreeIds } from 'harpparts'

import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceHarpStrataToActiveDegreeIds } from './reduce-harpstrata-to-activedegreeids'

test('an activeDegreeIds is returned from a harpstrata if no previuos activeDegreeIds is provided', () => {
  const harpStrata = activeCellsHarpStrata
  expect(reduceHarpStrataToActiveDegreeIds(harpStrata)).toStrictEqual(
    harpStrata.activeDegreeIds
  )
})

test('the previous activeDegreeIds object is returned if it matches the one on the harpstrata', () => {
  const harpStrata = activeCellsHarpStrata
  const prevActiveDegreeIds = [...harpStrata.activeDegreeIds]
  const nextActiveDegreeIds = reduceHarpStrataToActiveDegreeIds(
    harpStrata,
    prevActiveDegreeIds
  )
  expect(nextActiveDegreeIds).toBe(prevActiveDegreeIds)
  expect(nextActiveDegreeIds).not.toBe(harpStrata.activeDegreeIds)
  expect(nextActiveDegreeIds).toStrictEqual(harpStrata.activeDegreeIds)
})

test('an activeDegreeIds is returned from a harpstrata if the previous activeDegreeIds is different', () => {
  const harpStrata = activeCellsHarpStrata
  const prevActiveDegreeIds = [...harpStrata.activeDegreeIds, DegreeIds.Flat3]
  const nextActiveDegreeIds = reduceHarpStrataToActiveDegreeIds(
    harpStrata,
    prevActiveDegreeIds
  )
  expect(nextActiveDegreeIds).not.toBe(prevActiveDegreeIds)
  expect(nextActiveDegreeIds).not.toStrictEqual(prevActiveDegreeIds)
  expect(nextActiveDegreeIds).toStrictEqual(harpStrata.activeDegreeIds)
})
