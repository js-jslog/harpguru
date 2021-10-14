import { PitchIds } from 'harpparts'

import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceHarpStrataToRootPitchId } from './reduce-harpstrata-to-rootpitchid'

test('the previous RootPitchId object is returned if it matches the one on the harpstrata', () => {
  const harpStrata = activeCellsHarpStrata
  const { rootPitchId: prevRootPitchId } = harpStrata
  const nextRootPitchId = reduceHarpStrataToRootPitchId(
    prevRootPitchId,
    harpStrata
  )
  expect(nextRootPitchId).toBe(prevRootPitchId)
  // Because the rootPitchId is just an enum, which is effectively a
  // primitive, a string, checks of equality are `true` where the
  // object equivalent checks would be `false`. Leaving this test
  // in to demonstrate intention for potential object future here
  //
  // expect(nextRootPitchId).not.toBe(harpStrata.apparatus.RootPitchId)
  expect(nextRootPitchId).toStrictEqual(harpStrata.rootPitchId)
})

test('a new RootPitchId is returned from a harpstrata if the previous RootPitchId is different', () => {
  const harpStrata = activeCellsHarpStrata
  const { Gb: prevRootPitchId } = PitchIds
  const nextRootPitchId = reduceHarpStrataToRootPitchId(
    prevRootPitchId,
    harpStrata
  )
  expect(nextRootPitchId).not.toBe(prevRootPitchId)
  expect(nextRootPitchId).not.toStrictEqual(prevRootPitchId)
  expect(nextRootPitchId).toStrictEqual(harpStrata.rootPitchId)
})
