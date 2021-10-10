import { DegreeIds, PitchIds } from 'harpparts'

import {
  activeCellsHarpStrata,
  inactiveCellsHarpStrata,
} from '../../test-resources'

import { reduceCellToggleBufferToHarpStrata } from './reduce-celltogglebuffer-to-harpstrata'

test('the existing harpstrata is returned if there are no toggles buffered', () => {
  expect(reduceCellToggleBufferToHarpStrata(activeCellsHarpStrata, [])).toBe(
    activeCellsHarpStrata
  )
  expect(reduceCellToggleBufferToHarpStrata(inactiveCellsHarpStrata, [])).toBe(
    inactiveCellsHarpStrata
  )
})

test('the buffered toggles are added to the existing inactive harpstrata', () => {
  const bufferedActivityToggles = [
    DegreeIds.Root,
    DegreeIds.Third,
    DegreeIds.Fifth,
  ]
  const counterpartPitchIds = [PitchIds.C, PitchIds.E, PitchIds.G]
  const expectedNewHarpStrata = {
    ...inactiveCellsHarpStrata,
    activeDegreeIds: bufferedActivityToggles,
    activePitchIds: counterpartPitchIds,
  }
  expect(
    reduceCellToggleBufferToHarpStrata(
      inactiveCellsHarpStrata,
      bufferedActivityToggles
    )
  ).toStrictEqual(expectedNewHarpStrata)
})
