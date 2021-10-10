import {
  inactiveCellsHarpStrata,
  activeCellsHarpStrata,
} from '../../../../test-resources'

import { reduceEmptyActiveIdsToHarpStrata } from './reduce-emptyactiveids-to-harpstrata'

test('if the activeHarpStrata is already empty then return the original activeHarpStrata', () => {
  const activeHarpStrata = inactiveCellsHarpStrata
  const newHarpStrata = reduceEmptyActiveIdsToHarpStrata(activeHarpStrata)
  expect(newHarpStrata).toBe(activeHarpStrata)
})

test('if the activeHarpStrata has active cells then return similar harpstrata but for no activeids', () => {
  const activeHarpStrata = activeCellsHarpStrata
  const expectedNewHarpStrata = {
    ...activeHarpStrata,
    activeDegreeIds: [],
    activePitchIds: [],
  }
  const actualNewHarpStrata = reduceEmptyActiveIdsToHarpStrata(activeHarpStrata)
  expect(actualNewHarpStrata).not.toBe(expectedNewHarpStrata)
  expect(actualNewHarpStrata).toStrictEqual(expectedNewHarpStrata)
})
