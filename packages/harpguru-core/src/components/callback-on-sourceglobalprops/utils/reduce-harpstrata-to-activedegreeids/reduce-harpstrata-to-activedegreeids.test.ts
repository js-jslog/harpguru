import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceHarpStrataToActiveDegreeIds } from './reduce-harpstrata-to-activedegreeids'

test('an activeDegreeIds is returned from a harpstrata', () => {
  const harpStrata = activeCellsHarpStrata
  expect(reduceHarpStrataToActiveDegreeIds(harpStrata)).toStrictEqual(
    harpStrata.activeDegreeIds
  )
})
