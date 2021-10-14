import { TuningIds } from 'harpparts'

import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceHarpStrataToTuningId } from './reduce-harpstrata-to-tuningid'

test('the previous tuningId object is returned if it matches the one on the harpstrata', () => {
  const harpStrata = activeCellsHarpStrata
  const {
    apparatus: { tuningId: prevTuningId },
  } = harpStrata
  const nextTuningId = reduceHarpStrataToTuningId(prevTuningId, harpStrata)
  expect(nextTuningId).toBe(prevTuningId)
  // Because the tuningId is just an enum, which is effectively a
  // primitive, a string, checks of equality are `true` where the
  // object equivalent checks would be `false`. Leaving this test
  // in to demonstrate intention for potential object future here
  //
  // expect(nextTuningId).not.toBe(harpStrata.apparatus.tuningId)
  expect(nextTuningId).toStrictEqual(harpStrata.apparatus.tuningId)
})

test('a new tuningId is returned from a harpstrata if the previous tuningId is different', () => {
  const harpStrata = activeCellsHarpStrata
  const { Diminished: prevTuningId } = TuningIds
  const nextTuningId = reduceHarpStrataToTuningId(prevTuningId, harpStrata)
  expect(nextTuningId).not.toBe(prevTuningId)
  expect(nextTuningId).not.toStrictEqual(prevTuningId)
  expect(nextTuningId).toStrictEqual(harpStrata.apparatus.tuningId)
})
