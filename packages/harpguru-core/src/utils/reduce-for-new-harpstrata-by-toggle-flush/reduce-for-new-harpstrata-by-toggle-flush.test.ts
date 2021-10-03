import { DegreeIds, PitchIds } from 'harpparts'

import {
  activeCellsHarpStrata,
  inactiveCellsHarpStrata,
} from '../../test-resources'

import { reduceForNewHarpStrataByToggleFlush } from './reduce-for-new-harpstrata-by-toggle-flush'

test('the existing harpstrata is returned if there are no toggles buffered', () => {
  expect(reduceForNewHarpStrataByToggleFlush(activeCellsHarpStrata, [])).toBe(
    activeCellsHarpStrata
  )
  expect(reduceForNewHarpStrataByToggleFlush(inactiveCellsHarpStrata, [])).toBe(
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
    reduceForNewHarpStrataByToggleFlush(
      inactiveCellsHarpStrata,
      bufferedActivityToggles
    )
  ).toStrictEqual(expectedNewHarpStrata)
})
