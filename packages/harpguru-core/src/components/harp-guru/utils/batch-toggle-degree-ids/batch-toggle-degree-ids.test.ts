import { DegreeIds } from 'harpparts'

import { batchToggleDegreeIds } from './batch-toggle-degree-ids'

test('given an empty degree list, all the toggle ids are added', () => {
  const activeDegreeIds = [] as ReadonlyArray<DegreeIds>
  const degreeIdsToToggle = [DegreeIds.Flat3, DegreeIds.Root, DegreeIds.Flat7]

  const toggledDegreeIds = batchToggleDegreeIds(
    activeDegreeIds,
    degreeIdsToToggle
  )

  expect(toggledDegreeIds).toStrictEqual(degreeIdsToToggle)
})

test('given a degree list with none of the toggled ids, all the toggle ids are added', () => {
  const activeDegreeIds = [DegreeIds.Fourth]
  const degreeIdsToToggle = [DegreeIds.Flat3, DegreeIds.Root, DegreeIds.Flat7]

  const toggledDegreeIds = batchToggleDegreeIds(
    activeDegreeIds,
    degreeIdsToToggle
  )

  expect(toggledDegreeIds).toStrictEqual([
    ...activeDegreeIds,
    ...degreeIdsToToggle,
  ])
})

test('given a degree list with all and only the toggled ids, all the toggle ids are removed', () => {
  const activeDegreeIds = [DegreeIds.Flat7, DegreeIds.Root, DegreeIds.Flat3]
  const degreeIdsToToggle = [DegreeIds.Flat3, DegreeIds.Root, DegreeIds.Flat7]

  const toggledDegreeIds = batchToggleDegreeIds(
    activeDegreeIds,
    degreeIdsToToggle
  )

  expect(toggledDegreeIds).toStrictEqual([])
})

test('given a degree list with all and the toggled ids and a few more, all the toggle ids are removed', () => {
  const activeDegreeIds = [
    DegreeIds.Flat7,
    DegreeIds.Second,
    DegreeIds.Root,
    DegreeIds.Flat5,
    DegreeIds.Flat3,
  ]
  const degreeIdsToToggle = [DegreeIds.Flat3, DegreeIds.Root, DegreeIds.Flat7]
  const expectedNewActiveDegreeIds = [DegreeIds.Second, DegreeIds.Flat5]

  const toggledDegreeIds = batchToggleDegreeIds(
    activeDegreeIds,
    degreeIdsToToggle
  )

  expect(toggledDegreeIds).toStrictEqual(expectedNewActiveDegreeIds)
})

test('given a degree list with some of and the toggled ids, the absent ones are added and the present ones are removed', () => {
  const activeDegreeIds = [
    DegreeIds.Flat7,
    DegreeIds.Second,
    DegreeIds.Root,
    DegreeIds.Flat5,
    DegreeIds.Flat3,
  ]
  const degreeIdsToToggle = [
    DegreeIds.Flat3,
    DegreeIds.Flat2,
    DegreeIds.Root,
    DegreeIds.Flat7,
    DegreeIds.Seventh,
  ]
  const expectedNewActiveDegreeIds = [
    DegreeIds.Second,
    DegreeIds.Flat5,
    DegreeIds.Flat2,
    DegreeIds.Seventh,
  ]

  const toggledDegreeIds = batchToggleDegreeIds(
    activeDegreeIds,
    degreeIdsToToggle
  )

  expect(toggledDegreeIds).toStrictEqual(expectedNewActiveDegreeIds)
})
