import { ValvingIds } from 'harpparts'

import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceHarpStrataToValvingId } from './reduce-harpstrata-to-valvingid'

test('the previous ValvingId object is returned if it matches the one on the harpstrata', () => {
  const harpStrata = activeCellsHarpStrata
  const {
    apparatus: { valvingId: prevValvingId },
  } = harpStrata
  const nextValvingId = reduceHarpStrataToValvingId(prevValvingId, harpStrata)
  expect(nextValvingId).toBe(prevValvingId)
  // Because the valvingId is just an enum, which is effectively a
  // primitive, a string, checks of equality are `true` where the
  // object equivalent checks would be `false`. Leaving this test
  // in to demonstrate intention for potential object future here
  //
  // expect(nextValvingId).not.toBe(harpStrata.apparatus.ValvingId)
  expect(nextValvingId).toStrictEqual(harpStrata.apparatus.valvingId)
})

test('a new ValvingId is returned from a harpstrata if the previous ValvingId is different', () => {
  const harpStrata = activeCellsHarpStrata
  const { HalfValved: prevValvingId } = ValvingIds
  const nextValvingId = reduceHarpStrataToValvingId(prevValvingId, harpStrata)
  expect(nextValvingId).not.toBe(prevValvingId)
  expect(nextValvingId).not.toStrictEqual(prevValvingId)
  expect(nextValvingId).toStrictEqual(harpStrata.apparatus.valvingId)
})
