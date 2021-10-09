import { PitchIds } from 'harpparts'

import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceHarpStrataToHarpKeyId } from './reduce-harpstrata-to-harpkeyid'

test('the previous HarpKeyId object is returned if it matches the one on the harpstrata', () => {
  const harpStrata = activeCellsHarpStrata
  const { harpKeyId: prevHarpKeyId } = harpStrata
  const nextHarpKeyId = reduceHarpStrataToHarpKeyId(prevHarpKeyId, harpStrata)
  expect(nextHarpKeyId).toBe(prevHarpKeyId)
  // Because the harpKeyId is just an enum, which is effectively a
  // primitive, a string, checks of equality are `true` where the
  // object equivalent checks would be `false`. Leaving this test
  // in to demonstrate intention for potential object future here
  //
  // expect(nextHarpKeyId).not.toBe(harpStrata.apparatus.HarpKeyId)
  expect(nextHarpKeyId).toStrictEqual(harpStrata.harpKeyId)
})

test('a new HarpKeyId is returned from a harpstrata if the previous HarpKeyId is different', () => {
  const harpStrata = activeCellsHarpStrata
  const { Gb: prevHarpKeyId } = PitchIds
  const nextHarpKeyId = reduceHarpStrataToHarpKeyId(prevHarpKeyId, harpStrata)
  expect(nextHarpKeyId).not.toBe(prevHarpKeyId)
  expect(nextHarpKeyId).not.toStrictEqual(prevHarpKeyId)
  expect(nextHarpKeyId).toStrictEqual(harpStrata.harpKeyId)
})
