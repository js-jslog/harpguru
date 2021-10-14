import { PozitionIds } from 'harpparts'

import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceHarpStrataToPozitionId } from './reduce-harpstrata-to-pozitionid'

test('the previous PozitionId object is returned if it matches the one on the harpstrata', () => {
  const harpStrata = activeCellsHarpStrata
  const { pozitionId: prevPozitionId } = harpStrata
  const nextPozitionId = reduceHarpStrataToPozitionId(
    prevPozitionId,
    harpStrata
  )
  expect(nextPozitionId).toBe(prevPozitionId)
  // Because the pozitionId is just an enum, which is effectively a
  // primitive, a string, checks of equality are `true` where the
  // object equivalent checks would be `false`. Leaving this test
  // in to demonstrate intention for potential object future here
  //
  // expect(nextPozitionId).not.toBe(harpStrata.apparatus.PozitionId)
  expect(nextPozitionId).toStrictEqual(harpStrata.pozitionId)
})

test('a new PozitionId is returned from a harpstrata if the previous PozitionId is different', () => {
  const harpStrata = activeCellsHarpStrata
  const { Eighth: prevPozitionId } = PozitionIds
  const nextPozitionId = reduceHarpStrataToPozitionId(
    prevPozitionId,
    harpStrata
  )
  expect(nextPozitionId).not.toBe(prevPozitionId)
  expect(nextPozitionId).not.toStrictEqual(prevPozitionId)
  expect(nextPozitionId).toStrictEqual(harpStrata.pozitionId)
})
