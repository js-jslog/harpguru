import { DegreeIds } from 'harpstrata'
import type { ActiveDegreeIds } from 'harpstrata'

import { batchToggleDegreeIds } from './batch-toggle-degree-ids'

test('given an empty active degree list, all the toggle ids are added', () => {
  const activeDegreeIds = [] as ActiveDegreeIds
  const batchToggleIds = [ DegreeIds.Flat3, DegreeIds.Root, DegreeIds.Flat7 ]

  const newActiveDegreeIds = batchToggleDegreeIds(activeDegreeIds, batchToggleIds)

  expect(newActiveDegreeIds).toStrictEqual(batchToggleIds)
})
